// src/controllers/usuarioController.js
import bcrypt from "bcrypt";
import { Cadastro } from "../models/index.js"; // <- usar Cadastro
import { generateToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const usuarioController = {
  // Cadastro de usuário
  create: asyncHandler(async (req, res) => {
    const { nome, email, senha, tipoUsuario, instituicao, telefone } = req.body;

    // campos obrigatórios: nome, email, senha e tipoUsuario
    if (!nome || !email || !senha || !tipoUsuario) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    // verifica duplicidade por email
    const existing = await Usuario.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(senha, 10);
    const user = await Usuario.create({
      nome,
      email,
      senha: hash,
      tipoUsuario,
      instituicao,
      telefone,
    });

    return res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipoUsuario: user.tipoUsuario,
      instituicao: user.instituicao,
      telefone: user.telefone,
    });
  }),

  // Login
  login: asyncHandler(async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await Cadastro.findOne({ where: { email } }); // <-- aqui
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // compara senha pura com hash do banco
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = generateToken({
      id: usuario.idCadastro,
      email: usuario.email,
    });
    res.json({
      token,
      user: {
        id: usuario.idCadastro,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        instituicao: usuario.instituicao,
        telefone: usuario.telefone,
      },
    });
  }),

  // Perfil do usuário autenticado
  me: asyncHandler(async (req, res) => {
    const user = await Cadastro.findByPk(req.user.id, {
      attributes: [
        "idCadastro",
        "nome",
        "email",
        "perfil",
        "instituicao",
        "telefone",
        "criadoEm",
      ],
    });

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({
      id: user.idCadastro,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      instituicao: user.instituicao,
      telefone: user.telefone,
      criadoEm: user.criadoEm,
    });
  }),
};
