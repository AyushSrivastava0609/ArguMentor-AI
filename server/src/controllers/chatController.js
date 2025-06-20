import { generateChatResponse } from '../services/openaiService.js';
import { Session } from '../models/Session.js';

export async function chatController(req, res, next) {
  try {
    const { userText, mode, style, principles = [], sessionId } = req.body;

    if (!userText) {
      return res.status(400).json({ error: 'userText is required' });
    }

    // Load session if exists
    let session = sessionId ? await Session.findById(sessionId) : null;

    // Build base system prompts
    const systemMessages = [
      {
        role: 'system',
        content:
          'You are ArguMentor‑AI, an expert debate coach and ethics analyst. Keep responses accurate, brief, and in debate format.',
      },
      {
        role: 'system',
        content: `Debate Style: ${style}.`,
      },
    ];

    // Add ethical principles prompt if any
    const selected = principles.filter((p) => p !== 'Normal');
    if (selected.length > 0) {
      systemMessages.push({
        role: 'system',
        content: `Analyze from these ethical perspectives: ${selected.join(', ')}.`,
      });
    }

    // Prepare chat history (short-term memory)
    const pastMessages = session?.messages || [];
    const recentHistory = pastMessages.slice(-8).map((m) => ({
      role: m.sender === 'ai' ? 'assistant' : 'user',
      content: m.text,
    }));

    // Append the latest user message
    const finalMessages = [
      ...systemMessages,
      ...recentHistory,
      { role: 'user', content: userText },
    ];

    // Generate AI response
    const aiText = await generateChatResponse(finalMessages);

    // Save to session
    if (!session) {
      session = new Session({
        mode,
        styleKey: style,
        frameworkKeys: selected,
        messages: [],
      });
    }

    session.messages.push({ sender: 'user', text: userText });
    session.messages.push({ sender: 'ai', text: aiText });
    await session.save();

    // Respond with AI message and session ID
    res.json({ aiText, sessionId: session._id });
  } catch (err) {
    console.error("ChatController Error:", err);
    next(err);
  }
}
