import express from "express";
import { alunoController } from "../controllers/alunoController.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const router = express.Router();

// Área do aluno → todas precisam de auth + role
router.get("/me", auth, requireRole("aluno"), alunoController.me);
router.get("/transacoes", auth, requireRole("aluno"), alunoController.transacoes);
router.post("/resumos", auth, requireRole("aluno"), alunoController.enviarResumo);
router.post("/trocas", auth, requireRole("aluno"), alunoController.trocarMoedasPorPontos);

export default router;
