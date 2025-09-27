import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const AlunoTurma = sequelize.define(
    'alunos_turmas',
    {
        idAluno: {
            field: 'id_aluno',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'usuarios',
                key: 'id_usuario',
            },
        },
        idTurma: {
            field: 'id_turma',
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'turmas',
                key: 'id_turma',
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default AlunoTurma;