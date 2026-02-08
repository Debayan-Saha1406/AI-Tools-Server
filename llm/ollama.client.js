class OllamaClient {
  constructor() {
    this.baseUrl = "http://localhost:11434/api/generate";
    this.defaultModel = "gpt-oss:120b-cloud";
  }

  async generate(prompt, options = {}) {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: options.model ?? this.defaultModel,
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();
    return data.response;
  }
}

export const ollamaClient = new OllamaClient();
