import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { car, year, budget, goals } = req.body;

  const systemPrompt = `
You are RevHead VAI — Highrevs AI build planner.
Speak like a knowledgeable car enthusiast at a meet.
Be structured and practical.
Give realistic mod suggestions based on budget.
Keep it clean and confident.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `
Car: ${car}
Year: ${year}
Budget: ${budget}
Goals: ${goals}
          `,
        },
      ],
      temperature: 0.7,
    });

    res.status(200).json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}