import { Router } from "express";
import { senhaController } from "../controllers/senhaController.js";

const router = Router();

router.post("/forgot", senhaController.forgot);
router.post("/reset", senhaController.reset);

export default router;
