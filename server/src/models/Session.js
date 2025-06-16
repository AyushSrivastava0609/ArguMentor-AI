import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender:    { type: String, enum: ['user','ai'], required: true },
  text:      { type: String, required: true },
  timestamp: { type: Date, default: () => new Date() }
});

const sessionSchema = new mongoose.Schema({
  mode:            { type: String, required: true },  // 'text'|'voice'
  styleKey:        { type: String, required: true },  // e.g. 'Diplomatic'
  frameworkKeys:   { type: [String], default: [] },   // e.g. ['Care Ethics']
  createdAt:       { type: Date, default: () => new Date() },
  messages:        [messageSchema]
});

export const Session = mongoose.model('Session', sessionSchema);
