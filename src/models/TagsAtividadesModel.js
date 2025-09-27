import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const TagAtividade = sequelize.define(
    'tags_atividades',
    {
        id: {
            field: 'id_tag',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idAtividade: {
            field: 'id_atividade',
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'atividades',
                key: 'id_atividade',
            },
        },
        tag: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default TagAtividade;