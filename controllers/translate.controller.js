import { llmFactory } from "../llm/llm.factory.js";
import { LLM_TYPES } from "../llm/llm.types.js";

export async function translate(req, res) {
  try {
    const { from, to, text } = req.body;
    const prompt = `
        Translate the given text from ${from} to ${to}.
        Only give the translated text.
        Text: "${text}"
        `;

    const ollamaClient = llmFactory.getClient(LLM_TYPES.OLLAMA);
    const translatedText = await ollamaClient.generate(prompt);

    res.json({ translatedText });
  } catch (err) {
    res.status(500).json({ error: "Failed to translate" });
  }
}
