import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Resumo = sequelize.define(
    'resumos',
    {
        id: {
            field: 'id_resumo',
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
        conteudo: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM('finalizado', 'em_andamento', 'precisa_de_ajustes'),
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Resumo;