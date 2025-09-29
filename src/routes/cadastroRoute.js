import express from "express";
import { cadastroController } from "../controllers/cadastroController.js";

const router = express.Router();

// Endpoints públicos de cadastro
router.post("/", cadastroController.create);
router.get("/", cadastroController.list);
router.get("/:id", cadastroController.getById);
router.delete("/:id", cadastroController.remove);

export default router;
