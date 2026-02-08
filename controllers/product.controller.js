import { prisma } from "../lib/prisma.js";
import {
  getReviewsByProduct,
  getReviewSummary,
} from "../services/reviews.service.js";
import { getAllProducts, getProduct } from "../services/products.service.js";
import { llmFactory } from "../llm/llm.factory.js";
import { LLM_TYPES } from "../llm/llm.types.js";

export async function listProducts(req, res) {
  try {
    const products = await getAllProducts(prisma);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export async function getProductReviews(req, res) {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await getProduct(prisma, productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const reviews = await getReviewsByProduct(prisma, productId);
    const reviewSummary = await getReviewSummary(prisma, productId);

    res.json({
      summary: reviewSummary?.content ?? null,
      reviews,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}

export async function summarizeReviews(req, res) {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await getProduct(prisma, productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const reviews = await getReviewsByProduct(prisma, productId, 1);
    if (!reviews.length) {
      return res.status(404).json({ error: "No reviews found" });
    }

    const cached = await getReviewSummary(prisma, productId);
    if (cached && cached.expiresAt > new Date()) {
      return res.json({ summary: cached.content });
    }

    const joined = reviews.map((r) => r.content).join("\n\n");

    const prompt = `Please provide a concise summary of the following product reviews 
    without any heading:\n${joined}`;

    const ollamaClient = llmFactory.getClient(LLM_TYPES.OLLAMA);
    const summaryText = await ollamaClient.generate(prompt);

    const saved = await prisma.summary.upsert({
      where: { productId },
      update: {
        content: summaryText,
        generatedAt: new Date(),
      },
      create: {
        productId,
        content: summaryText,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({ summary: saved.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize" });
  }
}
