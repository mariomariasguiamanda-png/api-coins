import express from "express";
import { professorController } from "../controllers/professorController.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const router = express.Router();

// Rotas protegidas → apenas PROFESSOR
router.post("/atividades", auth, requireRole("professor"), professorController.criarAtividade);
router.get("/resumos/pendentes", auth, requireRole("professor"), professorController.listarResumosPendentes);
router.patch("/resumos/:idResumo", auth, requireRole("professor"), professorController.corrigirResumo);
router.get("/desempenho", auth, requireRole("professor"), professorController.desempenho);

export default router;
