import express from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Rota de teste
router.get("/", (req, res) => {
  res.json({ message: "Rota de usuários funcionando!", timestamp: new Date() });
});

// Cadastro
router.post("/register", usuarioController.create);

// Login
router.post("/login", usuarioController.login);

// Perfil (rota protegida)
router.get("/me", auth, usuarioController.me);

export default router;
