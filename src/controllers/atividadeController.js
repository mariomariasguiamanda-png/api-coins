import { Atividade, TagAtividade } from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const atividadeController = {
  // Criar atividade
  create: asyncHandler(async (req, res) => {
    const { titulo, disciplina, descricao, recompensaMoedas, nivelDificuldade, tempoEstimado, tags } = req.body;

    if (!titulo || !disciplina || !recompensaMoedas) {
      return res.status(400).json({ message: "Título, disciplina e recompensa são obrigatórios" });
    }

    const atividade = await Atividade.create({
      titulo,
      disciplina,
      descricao,
      recompensaMoedas,
      nivelDificuldade,
      tempoEstimado,
    });

    // Se vierem tags, associa
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        await TagAtividade.create({ idAtividade: atividade.id, tag });
      }
    }

    res.status(201).json(atividade);
  }),

  // Listar todas as atividades
  list: asyncHandler(async (req, res) => {
    const atividades = await Atividade.findAll({
      include: [{ model: TagAtividade, as: "tags", attributes: ["id", "tag"] }],
    });
    res.json(atividades);
  }),

  // Buscar atividade por ID
  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const atividade = await Atividade.findByPk(id, {
      include: [{ model: TagAtividade, as: "tags" }],
    });

    if (!atividade) return res.status(404).json({ message: "Atividade não encontrada" });

    res.json(atividade);
  }),

  // Atualizar atividade
  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { titulo, disciplina, descricao, recompensaMoedas, nivelDificuldade, tempoEstimado } = req.body;

    const atividade = await Atividade.findByPk(id);
    if (!atividade) return res.status(404).json({ message: "Atividade não encontrada" });

    atividade.titulo = titulo ?? atividade.titulo;
    atividade.disciplina = disciplina ?? atividade.disciplina;
    atividade.descricao = descricao ?? atividade.descricao;
    atividade.recompensaMoedas = recompensaMoedas ?? atividade.recompensaMoedas;
    atividade.nivelDificuldade = nivelDificuldade ?? atividade.nivelDificuldade;
    atividade.tempoEstimado = tempoEstimado ?? atividade.tempoEstimado;

    await atividade.save();
    res.json(atividade);
  }),

  // Deletar atividade
  remove: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const atividade = await Atividade.findByPk(id);
    if (!atividade) return res.status(404).json({ message: "Atividade não encontrada" });

    await atividade.destroy();
    res.json({ message: "Atividade removida com sucesso" });
  }),
};
