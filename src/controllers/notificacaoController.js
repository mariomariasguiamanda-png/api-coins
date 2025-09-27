import { Notificacao, Usuario } from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const notificacaoController = {
  // Criar notificação (admin ou professor)
  create: asyncHandler(async (req, res) => {
    const { idUsuario, mensagem } = req.body;

    if (!idUsuario || !mensagem) {
      return res.status(400).json({ message: "idUsuario e mensagem são obrigatórios" });
    }

    const user = await Usuario.findByPk(idUsuario);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const notificacao = await Notificacao.create({
      idUsuario,
      mensagem,
      dataEnvio: new Date(),
      status: "nao_lida",
    });

    res.status(201).json(notificacao);
  }),

  // Listar notificações do usuário autenticado
  minhas: asyncHandler(async (req, res) => {
    const notificacoes = await Notificacao.findAll({
      where: { idUsuario: req.user.id },
      order: [["dataEnvio", "DESC"]],
    });

    res.json(notificacoes);
  }),

  // Marcar notificação como lida
  marcarComoLida: asyncHandler(async (req, res) => {
    const { idNotificacao } = req.params;

    const notificacao = await Notificacao.findByPk(idNotificacao);
    if (!notificacao) return res.status(404).json({ message: "Notificação não encontrada" });

    if (notificacao.idUsuario !== req.user.id) {
      return res.status(403).json({ message: "Você não pode alterar esta notificação" });
    }

    notificacao.status = "lida";
    await notificacao.save();

    res.json({ message: "Notificação marcada como lida" });
  }),
};
