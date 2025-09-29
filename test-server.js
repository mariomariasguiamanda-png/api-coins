console.log("🎯 Testando configuração do servidor...");
console.log("📂 Diretório atual:", process.cwd());
console.log("🌍 NODE_ENV:", process.env.NODE_ENV);

import "dotenv/config";

console.log("🗄️ Configurações do banco:");
console.log("  HOST:", process.env.DB_HOST);
console.log("  PORT:", process.env.DB_PORT);
console.log("  NAME:", process.env.DB_NAME);
console.log("  USER:", process.env.DB_USER);
console.log("  PASS:", process.env.DB_PASS ? "***" : "undefined");
