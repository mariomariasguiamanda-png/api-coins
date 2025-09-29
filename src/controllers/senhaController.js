import crypto from "crypto";
import bcrypt from "bcrypt";
import { Cadastro, PasswordResetToken } from "../models/index.js";
import sendMail from "../utils/sendMail.js";
import { emailTemplates } from "../utils/emailTemplates.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const senhaController = {
  // Solicitar redefinição
  forgot: asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await Cadastro.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const token = crypto.randomBytes(32).toString("hex");
    await PasswordResetToken.create({
      idCadastro: user.idCadastro,
      token,
      expiresAt: new Date(Date.now() + 3600000), // 1 hora
    });

    const resetLink = `http://localhost:3000/redefinir-senha?token=${token}`;
    const emailBody = emailTemplates.passwordReset(user.nome, resetLink);

    // 🔹 Preparar attachment da logo para o email de reset
    const logoPath = "../coins/public/logo-coins.png";

    await sendMail(
      user.email,
      user.nome,
      emailBody,
      "🔑 Redefinição de senha - Coins for Study",
      [
        {
          filename: "logo-coins.png",
          path: logoPath,
          cid: "logoCoins", // ID usado no src="cid:logoCoins"
        },
      ]
    );

    res.json({ message: "E-mail enviado!" });
  }),

  // Redefinir senha
  reset: asyncHandler(async (req, res) => {
    const { token, novaSenha, senha } = req.body;
    const passwordToUse = novaSenha || senha;

    const tokenData = await PasswordResetToken.findOne({ where: { token } });
    if (!tokenData || tokenData.expiresAt < new Date()) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }

    const user = await Cadastro.findByPk(tokenData.idCadastro);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    if (!passwordToUse) {
      return res.status(400).json({ message: "Nova senha é obrigatória" });
    }

    user.senha = await bcrypt.hash(passwordToUse, 10);
    await user.save();
    await tokenData.destroy();

    res.json({ message: "Senha redefinida com sucesso!" });
  }),
};
