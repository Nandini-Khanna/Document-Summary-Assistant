import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function summarizeText(text, length) {
  let targetTokens;
  let targetWords;

  switch (length) {
    case "short":
      targetTokens = 150;
      targetWords = 100;
      break;
    case "long":
      targetTokens = 550;
      targetWords = 350;
      break;
    case "medium":
    default:
      targetTokens = 300;
      targetWords = 200;
      break;
  }

  const completion = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that summarizes text clearly.",
      },
      {
        role: "user",
        content: `Summarize the following text in about ${targetWords} words:\n\n${text}`,
      },
    ],
    max_tokens: targetTokens,
  });

  return completion.choices[0].message.content.trim();
}
