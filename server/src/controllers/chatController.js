import { generateChatResponse } from '../services/openaiService.js';
import { Session } from '../models/Session.js';

export async function chatController(req, res, next) {
  try {
    const { userText, mode, style, principles = [], sessionId } = req.body;
    if (!userText) {
      return res.status(400).json({ error: 'userText is required' });
    }

    // Filter out default "Normal" principle
    const selected = principles.filter(p => p !== 'Normal');

    // Build system prompts
    const systemMessages = [
      { role: 'system', content: 'You are ArguMentor‑AI, an expert debate coach and ethics analyst. The user will be debating - So keept the responses accurate and brief so that it makes the debate more engaging and interactive' },
      { role: 'system', content: `Debate Style: ${style}.` }
    ];
    if (selected.length > 0) {
      systemMessages.push({
        role: 'system',
        content: `Analyze from these ethical perspectives: ${selected.join(', ')}.`
      });
    }

    // Append user input
    systemMessages.push({ role: 'user', content: userText });

    // Call OpenAI
    const aiText = await generateChatResponse(systemMessages);

    // Persist session & messages
    let session = sessionId
      ? await Session.findById(sessionId)
      : null;

    if (!session) {
      session = new Session({
        mode,
        styleKey: style,
        frameworkKeys: selected,
        messages: []
      });
    }

    session.messages.push({ sender: 'user', text: userText });
    session.messages.push({ sender: 'ai',   text: aiText });
    await session.save();

    res.json({ aiText, sessionId: session._id });
  } catch (err) {
    next(err);
  }
}
