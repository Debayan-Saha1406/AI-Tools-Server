import { llmFactory } from "../llm/llm.factory.js";
import { LLM_TYPES } from "../llm/llm.types.js";

export async function summarizePdf(req, res) {
  try {
    const { message } = req.body;
    const prompt = `
        Summarize the given text.
        Text: "${message}"
        `;

    const ollamaClient = llmFactory.getClient(LLM_TYPES.OLLAMA);
    const result = await ollamaClient.generate(prompt);

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: "Failed to translate" });
  }
}
