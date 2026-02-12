import { Router } from "express";
import { summarizePdf } from "../controllers/pdfsummarize.controller.js";

const router = Router();

router.post("/pdf/summarize", summarizePdf);

export default router;
