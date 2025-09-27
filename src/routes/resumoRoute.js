import express from "express";
import { resumoController } from "../controllers/resumoController.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const router = express.Router();

// Aluno cria e consulta seus resumos
router.post("/", auth, requireRole("aluno"), resumoController.create);
router.get("/meus", auth, requireRole("aluno"), resumoController.meusResumos);

// Professor/Admin podem ver todos
router.get("/", auth, requireRole("professor"), resumoController.listAll);
router.get("/", auth, requireRole("admin"), resumoController.listAll);

// Atualizar (aluno dono ou professor corrigindo)
router.put("/:idResumo", auth, resumoController.update);

// Remover (aluno dono ou admin)
router.delete("/:idResumo", auth, resumoController.remove);

export default router;
