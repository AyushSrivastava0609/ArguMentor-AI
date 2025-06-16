import { Session } from '../models/Session.js';

export async function listSessions(_req, res, next) {
  try {
    const sessions = await Session.find({})
      .sort({ createdAt: -1 })
      .select('mode styleKey frameworkKeys createdAt');
    res.json(sessions);
  } catch (err) {
    next(err);
  }
}

export async function getSessionMessages(req, res, next) {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId)
      .select('messages');
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({
      sessionId: session._id,
      messages:  session.messages
    });
  } catch (err) {
    next(err);
  }
}
