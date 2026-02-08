import { Router } from "express";
import {
  listProducts,
  getProductReviews,
  summarizeReviews,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id/reviews", getProductReviews);
router.post("/:id/reviews/summarize", summarizeReviews);

export default router;
