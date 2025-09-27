import {
  Atividade,
  Resumo,
  Usuario,
} from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const professorController = {
  // Criar nova atividade
  criarAtividade: asyncHandler(async (req, res) => {
    const { titulo, disciplina, descricao, recompensaMoedas, nivelDificuldade, tempoEstimado } = req.body;

    if (!titulo || !disciplina || !recompensaMoedas) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const atividade = await Atividade.create({
      titulo,
      disciplina,
      descricao,
      recompensaMoedas,
      nivelDificuldade,
      tempoEstimado,
    });

    res.status(201).json(atividade);
  }),

  // Listar resumos enviados pelos alunos (pendentes de correção)
  listarResumosPendentes: asyncHandler(async (req, res) => {
    const resumos = await Resumo.findAll({
      where: { status: "em_andamento" },
      include: [
        {
          model: Usuario,
          as: "aluno",
          attributes: ["id", "nome", "email"],
        },
      ],
    });

    res.json(resumos);
  }),

  // Corrigir resumo
  corrigirResumo: asyncHandler(async (req, res) => {
    const { idResumo } = req.params;
    const { status } = req.body; // "finalizado" | "precisa_de_ajustes"

    const resumo = await Resumo.findByPk(idResumo);
    if (!resumo) return res.status(404).json({ message: "Resumo não encontrado" });

    resumo.status = status;
    await resumo.save();

    res.json({ message: "Resumo atualizado com sucesso", resumo });
  }),

  // Acompanhar desempenho dos alunos
  desempenho: asyncHandler(async (req, res) => {
    const alunos = await Usuario.findAll({
      where: { tipoUsuario: "aluno" },
      attributes: ["id", "nome", "email"],
      include: [
        {
          model: Resumo,
          as: "resumos",
          attributes: ["id", "titulo", "disciplina", "status"],
        },
      ],
    });

    res.json(alunos);
  }),
};
