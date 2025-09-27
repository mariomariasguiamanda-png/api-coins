import Administrador from "./AdministradoresModel.js";
import Usuario from "./UsuariosModel.js";
import Turma from "./TurmasModel.js";
import AlunoTurma from "./AlunosTurmasModel.js";
import Atividade from "./AtividadesModel.js";
import TagAtividade from "./TagsAtividadesModel.js";
import Resumo from "./ResumosModel.js";
import Notificacao from "./NotificacoesModel.js";
import TransacaoMoeda from "./TransacoesMoedasModel.js";

//
// Associações
//

// 🔹 Usuario -> Notificações (1:N)
Usuario.hasMany(Notificacao, { foreignKey: "idUsuario", as: "notificacoes" });
Notificacao.belongsTo(Usuario, { foreignKey: "idUsuario", as: "usuario" });

// 🔹 Usuario -> Resumos (1:N)   (um aluno cria vários resumos)
Usuario.hasMany(Resumo, { foreignKey: "id", sourceKey: "id", as: "resumos" });
Resumo.belongsTo(Usuario, { foreignKey: "id", targetKey: "id", as: "aluno" });

// 🔹 Usuario -> Transações (1:N)
Usuario.hasMany(TransacaoMoeda, { foreignKey: "idAluno", as: "transacoes" });
TransacaoMoeda.belongsTo(Usuario, { foreignKey: "idAluno", as: "aluno" });

// 🔹 Usuario <-> Turma (N:N via AlunoTurma)
Usuario.belongsToMany(Turma, {
  through: AlunoTurma,
  foreignKey: "idAluno",
  otherKey: "idTurma",
  as: "turmas",
});
Turma.belongsToMany(Usuario, {
  through: AlunoTurma,
  foreignKey: "idTurma",
  otherKey: "idAluno",
  as: "alunos",
});

// 🔹 Atividade -> Tags (1:N)
Atividade.hasMany(TagAtividade, { foreignKey: "idAtividade", as: "tags" });
TagAtividade.belongsTo(Atividade, { foreignKey: "idAtividade", as: "atividade" });

// 🔹 Atividade -> Resumos (1:N opcional)
Atividade.hasMany(Resumo, { foreignKey: "id", sourceKey: "id", as: "resumos" });
Resumo.belongsTo(Atividade, { foreignKey: "id", targetKey: "id", as: "atividade" });

// (Administrador por enquanto não tem associação explícita, mas pode ganhar
// se futuramente precisar vincular logs, configs, etc.)

//
// Exportando todos os models centralizados
//
export {
  Administrador,
  Usuario,
  Turma,
  AlunoTurma,
  Atividade,
  TagAtividade,
  Resumo,
  Notificacao,
  TransacaoMoeda,
};
