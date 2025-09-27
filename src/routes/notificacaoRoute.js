import express from "express";
import { notificacaoController } from "../controllers/notificacaoController.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const router = express.Router();

// Criar notificação (somente admin/professor)
router.post("/", auth, requireRole("admin"), notificacaoController.create);
router.post("/", auth, requireRole("professor"), notificacaoController.create);

// Ver notificações do usuário autenticado
router.get("/me", auth, notificacaoController.minhas);

// Marcar notificação como lida
router.patch("/:idNotificacao/lida", auth, notificacaoController.marcarComoLida);

export default router;
