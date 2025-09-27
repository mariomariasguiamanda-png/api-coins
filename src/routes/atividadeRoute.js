import express from "express";
import { atividadeController } from "../controllers/atividadeController.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const router = express.Router();

// Professores e administradores podem gerenciar atividades
router.post("/", auth, requireRole("professor"), atividadeController.create);
router.get("/", auth, atividadeController.list);
router.get("/:id", auth, atividadeController.getById);
router.put("/:id", auth, requireRole("professor"), atividadeController.update);
router.delete("/:id", auth, requireRole("professor"), atividadeController.remove);

export default router;
