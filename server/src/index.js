import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import healthRoutes from './routes/health.js';
import chatRoutes from './routes/chat.js';
import sessionRoutes from './routes/sessions.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/health',    healthRoutes);
app.use('/api/chat',      chatRoutes);
app.use('/api/sessions',  sessionRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
