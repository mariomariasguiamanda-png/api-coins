import { sequelize } from "../config/postgres.js";
import {
  Usuario,
  Resumo,
  TransacaoMoeda,
} from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paginate } from "../utils/paginate.js";
import { Conversao } from "../utils/conversaoMoedas.js";

export const alunoController = {
  // Dados básicos do aluno
  me: asyncHandler(async (req, res) => {
    const aluno = await Usuario.findByPk(req.user.id, {
      attributes: ["id", "nome", "email", "tipoUsuario", "cpf"],
    });

    if (!aluno || aluno.tipoUsuario !== "aluno") {
      return res.status(403).json({ message: "Apenas alunos podem acessar" });
    }

    res.json(aluno);
  }),

  // Histórico de transações
  transacoes: asyncHandler(async (req, res) => {
    const { page, limit, offset } = paginate(req.query);

    const { rows, count } = await TransacaoMoeda.findAndCountAll({
      where: { idAluno: req.user.id },
      order: [["dataTransacao", "DESC"]],
      limit,
      offset,
    });

    res.json({ items: rows, total: count, page });
  }),

  // Enviar resumo
  enviarResumo: asyncHandler(async (req, res) => {
    const { titulo, disciplina, conteudo } = req.body;

    if (!titulo || !disciplina || !conteudo) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const resumo = await Resumo.create({
      titulo,
      disciplina,
      conteudo,
      status: "em_andamento",
      id: req.user.id, // FK do aluno
    });

    res.status(201).json(resumo);
  }),

  // Trocar moedas por pontos
  trocarMoedasPorPontos: asyncHandler(async (req, res) => {
    const { pontosDesejados } = req.body;
    const pontos = Number(pontosDesejados);

    if (!pontos || pontos <= 0) {
      return res.status(400).json({ message: "pontosDesejados inválido" });
    }

    const moedasNec = Conversao.calcularMoedasNecessarias(pontos);

    await sequelize.transaction(async (t) => {
      const aluno = await Usuario.findByPk(req.user.id, { transaction: t, lock: t.LOCK.UPDATE });

      if (!aluno) throw new Error("Aluno não encontrado");
      if (aluno.saldo_moedas < moedasNec) throw new Error("Saldo insuficiente");

      // Debita moedas
      aluno.saldo_moedas -= moedasNec;
      await aluno.save({ transaction: t });

      // Registra transação
      await TransacaoMoeda.create(
        {
          idAluno: aluno.id,
          tipo: "resgate",
          quantidade: moedasNec,
          descricao: "Troca de moedas por pontos",
          dataTransacao: new Date(),
        },
        { transaction: t }
      );

      return res.json({
        novoSaldo: aluno.saldo_moedas,
        pontosGerados: pontos,
      });
    });
  }),
};
