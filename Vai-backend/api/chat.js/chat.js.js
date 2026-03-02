// api/chat.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: "No message provided" });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [{ role: "user", content: message }]
      });

      res.status(200).json({ response: response.choices[0].message.content });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}