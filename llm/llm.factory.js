import { ollamaClient } from "./ollama.client.js";
// later:
// import { openAiClient } from "./openai.client.js";

import { LLM_TYPES } from "./llm.types.js";

class LlmFactory {
  constructor() {
    this.clients = {
      [LLM_TYPES.OLLAMA]: ollamaClient,
      // [LLM_TYPES.OPENAI]: openAiClient,
    };
  }

  getClient(type) {
    const client = this.clients[type];

    if (!client) {
      throw new Error(`Unsupported LLM type: ${type}`);
    }
    return client;
  }
}

export const llmFactory = new LlmFactory();
