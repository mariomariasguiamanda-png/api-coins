import { Resumo, Usuario, Atividade } from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const resumoController = {
  // Criar resumo (aluno)
  create: asyncHandler(async (req, res) => {
    const { titulo, disciplina, conteudo, idAtividade } = req.body;

    if (!titulo || !disciplina || !conteudo) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const resumo = await Resumo.create({
      titulo,
      disciplina,
      conteudo,
      status: "em_andamento",
      id: req.user.id, // aluno logado
      idAtividade,
    });

    res.status(201).json(resumo);
  }),

  // Listar resumos do aluno logado
  meusResumos: asyncHandler(async (req, res) => {
    const resumos = await Resumo.findAll({
      where: { id: req.user.id },
      include: [
        { model: Atividade, as: "atividade", attributes: ["id", "titulo", "disciplina"] },
      ],
    });
    res.json(resumos);
  }),

  // Listar todos os resumos (admin/professor)
  listAll: asyncHandler(async (req, res) => {
    const resumos = await Resumo.findAll({
      include: [
        { model: Usuario, as: "aluno", attributes: ["id", "nome", "email"] },
        { model: Atividade, as: "atividade", attributes: ["id", "titulo"] },
      ],
    });
    res.json(resumos);
  }),

  // Atualizar resumo (aluno edita o dele ou professor corrige)
  update: asyncHandler(async (req, res) => {
    const { idResumo } = req.params;
    const { titulo, disciplina, conteudo, status } = req.body;

    const resumo = await Resumo.findByPk(idResumo);
    if (!resumo) return res.status(404).json({ message: "Resumo não encontrado" });

    // Se for aluno dono do resumo
    if (req.user.role === "aluno" && resumo.id !== req.user.id) {
      return res.status(403).json({ message: "Você não pode editar este resumo" });
    }

    // Atualiza campos
    resumo.titulo = titulo ?? resumo.titulo;
    resumo.disciplina = disciplina ?? resumo.disciplina;
    resumo.conteudo = conteudo ?? resumo.conteudo;

    // Professores podem corrigir (mudar status)
    if (req.user.role === "professor" && status) {
      resumo.status = status;
    }

    await resumo.save();
    res.json(resumo);
  }),

  // Remover resumo
  remove: asyncHandler(async (req, res) => {
    const { idResumo } = req.params;

    const resumo = await Resumo.findByPk(idResumo);
    if (!resumo) return res.status(404).json({ message: "Resumo não encontrado" });

    // Apenas o dono (aluno) ou admin pode deletar
    if (req.user.role === "aluno" && resumo.id !== req.user.id) {
      return res.status(403).json({ message: "Você não pode deletar este resumo" });
    }

    await resumo.destroy();
    res.json({ message: "Resumo removido com sucesso" });
  }),
};
