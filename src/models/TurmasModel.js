import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Turma = sequelize.define(
    'turmas',
    {
        id: {
            field: 'id_turma',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Turma;