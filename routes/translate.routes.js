import { Router } from "express";
import { translate } from "../controllers/translate.controller.js";

const router = Router();

router.post("/", translate);

export default router;
