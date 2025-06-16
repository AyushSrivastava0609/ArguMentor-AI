import express from 'express';
import {
  listSessions,
  getSessionMessages
} from '../controllers/sessionController.js';

const router = express.Router();

router.get('/', listSessions);
router.get('/:sessionId/messages', getSessionMessages);

export default router;
