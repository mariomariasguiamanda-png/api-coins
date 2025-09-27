import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Atividade = sequelize.define(
    'atividades',
    {
        id: {
            field: 'id_atividade',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        disciplina: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.TEXT,
        },
        recompensaMoedas: {
            field: 'recompensa_moedas',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nivelDificuldade: {
            field: 'nivel_dificuldade',
            type: DataTypes.ENUM('facil', 'medio', 'dificil'),
        },
        tempoEstimado: {
            field: 'tempo_estimado',
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Atividade;