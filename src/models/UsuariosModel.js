import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Usuario = sequelize.define(
    'usuarios',
    {
        id: {
            field: 'id_usuario',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tipoUsuario: {
            field: 'tipo_usuario',
            type: DataTypes.ENUM('aluno', 'professor'),
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Usuario;