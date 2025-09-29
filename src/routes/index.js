import express from "express";

// Importando cada rota
import usuarioRoutes from "./usuarioRoute.js";
import alunoRoutes from "./alunoRoute.js";
import professorRoutes from "./professorRoute.js";
import administradorRoutes from "./administradorRoute.js";
import atividadeRoutes from "./atividadeRoute.js";
import resumoRoutes from "./resumoRoute.js";
import notificacaoRoutes from "./notificacaoRoute.js";
import cadastroRoutes from "./cadastroRoute.js";
import senhaRoutes from "./senhaRoute.js";

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API Coins for Study funcionando!" });
});

// Montando rotas com prefixos
router.use("/usuarios", usuarioRoutes);
router.use("/alunos", alunoRoutes);
router.use("/professores", professorRoutes);
router.use("/administradores", administradorRoutes);
router.use("/atividades", atividadeRoutes);
router.use("/resumos", resumoRoutes);
router.use("/notificacoes", notificacaoRoutes);
router.use("/cadastros", cadastroRoutes);
router.use("/senha", senhaRoutes);

export default router;
