import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Cadastro = sequelize.define(
  "cadastros",
  {
    idCadastro: {
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
      validate: { isEmail: true },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    perfil: {
      type: DataTypes.ENUM("student", "teacher", "admin"),
      allowNull: false,
      defaultValue: "student",
    },
    instituicao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    criadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "cadastros",
    timestamps: false,
  }
);

export default Cadastro;
