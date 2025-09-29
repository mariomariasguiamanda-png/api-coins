import "dotenv/config";
import bcrypt from "bcrypt";
import { sequelize } from "../config/postgres.js";
import { Usuario } from "../models/index.js";

(async () => {
  try {
    await sequelize.authenticate();

    // Usuários de seed
    const seeds = [
      {
        nome: "Administrador Padrão",
        email: "admin@coins.com",
        senha: "admin123",
        tipoUsuario: "admin",
      },
      {
        nome: "Aluno Teste",
        email: "aluno@coins.com",
        senha: "aluno123",
        tipoUsuario: "aluno",
      },
      {
        nome: "Professor Teste",
        email: "professor@coins.com",
        senha: "prof123",
        tipoUsuario: "professor",
      }
    ];

    for (const seed of seeds) {
      let user = await Usuario.findOne({ where: { email: seed.email } });
      if (!user) {
        const hash = await bcrypt.hash(seed.senha, 10);
        user = await Usuario.create({
          nome: seed.nome,
          email: seed.email,
          senha: hash,
          tipoUsuario: seed.tipoUsuario,
        });
        console.log(`✅ Usuário ${seed.tipoUsuario} criado: ${seed.email} / ${seed.senha}`);
      } else {
        console.log(`ℹ️ Usuário ${seed.tipoUsuario} já existe: ${seed.email}`);
      }
    }

  } catch (err) {
    console.error("❌ Erro ao rodar seed:", err);
  } finally {
    await sequelize.close();
  }
})();
