import "dotenv/config";
import { sequelize } from "./config/postgres.js";
import * as models from "./models/index.js"; // importa todos os models + associações

(async () => {
  try {
    await sequelize.authenticate();
    console.log("[DB] Conectado.");

    // Sincronizar todos os models e relações
    await sequelize.sync({ alter: true });
    console.log("[DB] Sync finalizado.");
  } catch (err) {
    console.error("[DB] Erro ao sincronizar:", err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
