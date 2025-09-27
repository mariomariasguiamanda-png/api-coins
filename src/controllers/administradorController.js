import { Turma, Usuario } from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

export const administradorController = {
  // Criar turma
  criarTurma: asyncHandler(async (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ message: "Nome da turma é obrigatório" });

    // Evitar duplicação de turmas
    const existing = await Turma.findOne({ where: { nome } });
    if (existing) {
      return res.status(400).json({ message: "Já existe uma turma com esse nome" });
    }

    const turma = await Turma.create({ nome });
    res.status(201).json(turma);
  }),

  // Listar turmas
  listarTurmas: asyncHandler(async (req, res) => {
    const turmas = await Turma.findAll();
    res.json(turmas);
  }),

  // Criar usuário (professor ou aluno)
  criarUsuario: asyncHandler(async (req, res) => {
    const { nome, email, senha, tipoUsuario, cpf } = req.body;

    if (!nome || !email || !senha || !tipoUsuario || !cpf) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    // Verificar duplicações
    const existingEmail = await Usuario.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const existingCpf = await Usuario.findOne({ where: { cpf } });
    if (existingCpf) {
      return res.status(400).json({ message: "CPF já cadastrado" });
    }

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

  // Listar usuários
  listarUsuarios: asyncHandler(async (req, res) => {
    const usuarios = await Usuario.findAll({
      attributes: ["id", "nome", "email", "tipoUsuario", "cpf"],
    });
    res.json(usuarios);
  }),

  // Deletar usuário
  deletarUsuario: asyncHandler(async (req, res) => {
    const { idUsuario } = req.params;

    const usuario = await Usuario.findByPk(idUsuario);
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    // Proteção extra: não deixar apagar o último admin
    if (usuario.tipoUsuario === "admin") {
      const countAdmins = await Usuario.count({ where: { tipoUsuario: "admin" } });
      if (countAdmins <= 1) {
        return res.status(400).json({ message: "Não é permitido remover o último administrador" });
      }
    }

    await usuario.destroy();
    res.json({ message: "Usuário removido com sucesso" });
  }),
};
