import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  throw new Error("❌ GROQ_API_KEY is missing in .env");
}

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const reviewWithAI = async (code) => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are a Senior Software Engineer.

Review the user's code and return your answer in **GitHub Markdown**.

Use the following format:

# AI Code Review

## Critical Issues
- ...

## Warnings
- ...

## Suggestions
- ...

## Time Complexity
- ...

## Space Complexity
- ...

## Improved Code

\`\`\`cpp
// corrected code here
\`\`\`

If there are no issues in a section, write "None".
`,
        },
        {
          role: "user",
          content: code,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("🔥 Groq Error:", err);

    if (err.status) {
      console.error("Status:", err.status);
    }

    if (err.error) {
      console.error(err.error);
    }

    throw new Error("Failed to review code.");
  }
};