import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const TransacaoMoeda = sequelize.define(
    'transacoes_moedas',
    {
        id: {
            field: 'id_transacao',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idAluno: {
            field: 'id_aluno',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id_usuario',
            },
        },
        tipo: {
            type: DataTypes.ENUM('ganho', 'resgate', 'ajuste_admin'),
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING(255),
        },
        dataTransacao: {
            field: 'data_transacao',
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default TransacaoMoeda;