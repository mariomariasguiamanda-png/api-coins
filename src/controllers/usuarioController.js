import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const usuarioController = {
  // Cadastro de usuário
  create: asyncHandler(async (req, res) => {
    const { nome, email, senha, tipoUsuario, cpf } = req.body;

    if (!nome || !email || !senha || !tipoUsuario || !cpf) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    // Gera hash da senha
    const hash = await bcrypt.hash(senha, 10);

    const user = await Usuario.create({
      nome,
      email,
      senha: hash,
      tipoUsuario,
      cpf,
    });

    res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipoUsuario: user.tipoUsuario,
    });
  }),

  // Login
  login: asyncHandler(async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    const user = await Usuario.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ message: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: user.id, role: user.tipoUsuario },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
      },
    });
  }),

  // Perfil do usuário autenticado
  me: asyncHandler(async (req, res) => {
    const user = await Usuario.findByPk(req.user.id, {
      attributes: ["id", "nome", "email", "tipoUsuario", "cpf"],
    });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  }),
};
