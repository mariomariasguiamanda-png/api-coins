import express from "express";
import { administradorController } from "../controllers/administradorController.js";
import { auth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/roles.js";

const router = express.Router();

// Apenas ADMIN pode acessar
router.post("/turmas", auth, requireRole("admin"), administradorController.criarTurma);
router.get("/turmas", auth, requireRole("admin"), administradorController.listarTurmas);

router.post("/usuarios", auth, requireRole("admin"), administradorController.criarUsuario);
router.get("/usuarios", auth, requireRole("admin"), administradorController.listarUsuarios);
router.delete("/usuarios/:idUsuario", auth, requireRole("admin"), administradorController.deletarUsuario);

export default router;
