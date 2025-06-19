import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();    

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateChatResponse(messages) {
  const res = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages,
    temperature: 0.7,
    top_p: 0.9
  });
  return res.choices[0].message.content;
}
