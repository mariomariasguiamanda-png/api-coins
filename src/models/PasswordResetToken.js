import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";
import Cadastro from "./CadastroModel.js";

const PasswordResetToken = sequelize.define(
  "PasswordResetToken",
  {
    idToken: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    token: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  },
  { tableName: "password_reset_tokens", timestamps: false }
);

// Relacionar com Cadastro
Cadastro.hasMany(PasswordResetToken, {
  foreignKey: "idCadastro",
  as: "tokens",
});
PasswordResetToken.belongsTo(Cadastro, {
  foreignKey: "idCadastro",
  as: "cadastro",
});

export default PasswordResetToken;
