import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Administrador = sequelize.define(
    'administradores',
    {
        id: {
            field: 'id_admin',
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
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Administrador;