import app from './app.js';
import { checkDb } from './config/postgres.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await checkDb();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar o servidor:', err.message);
    process.exit(1);
  }
})();
