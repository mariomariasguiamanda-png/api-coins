import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Notificacao = sequelize.define(
    'notificacoes',
    {
        id: {
            field: 'id_notificacao',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idUsuario: {
            field: 'id_usuario',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id_usuario',
            },
        },
        mensagem: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dataEnvio: {
            field: 'data_envio',
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('lida', 'nao_lida'),
            allowNull: false,
            defaultValue: 'nao_lida',
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default Notificacao;