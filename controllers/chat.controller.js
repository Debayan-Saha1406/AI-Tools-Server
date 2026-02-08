import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { llmFactory } from "../llm/llm.factory.js";
import { LLM_TYPES } from "../llm/llm.types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const template = fs.readFileSync(
  path.join(__dirname, "../prompts/prompts.txt"),
  "utf-8",
);

const parkInfo = fs.readFileSync(
  path.join(__dirname, "../prompts/WonderWorld.md"),
  "utf-8",
);

const instructions = template.replace("{{parkInfo}}", parkInfo);

export async function chat(req, res) {
  try {
    const { message } = req.body;
    const fullPrompt = `
        System Instructions: ${instructions}
        QUESTION: ${message}
        `;

    const ollamaClient = llmFactory.getClient(LLM_TYPES.OLLAMA);
    const result = await ollamaClient.generate(fullPrompt);

    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
}
