# 🚀 Coins API

API RESTful para o projeto **Coins for Study**, construída em **Node.js + Express + Sequelize + PostgreSQL**.

## 📦 Requisitos

- Node.js >= 18
- PostgreSQL (local ou cloud, ex.: [Neon](https://neon.tech))

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/coins-api.git
cd coins-api
2. Instale as dependências
bash
Copiar código
npm install
3. Configure os arquivos .env
Ambiente de Desenvolvimento (.env.development)
env
Copiar código
PORT=3001
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=coins
DB_USER=postgres
DB_PASS=postgres
DB_SSL=false

JWT_SECRET=uma_chave_bem_grande_e_secreta
JWT_EXPIRES=7d

EMAIL_USER=seuemail@exemplo.com
EMAIL_PASS=sua_senha_de_app
Ambiente de Produção (.env.production)
env
Copiar código
PORT=3001
NODE_ENV=production

DB_HOST=ep-damp-thunder-adgn8tca-pooler.c-2.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASS=sua_senha_neon
DB_SSL=true

JWT_SECRET=uma_chave_bem_grande_e_secreta
JWT_EXPIRES=7d

EMAIL_USER=seuemail@exemplo.com
EMAIL_PASS=sua_senha_de_app
▶️ Scripts Disponíveis
No package.json:

json
Copiar código
"scripts": {
  "dev": "nodemon src/server.js",                               // Desenvolvimento
  "start": "node src/server.js",                                // Produção real (deploy)
  "prod": "cross-env NODE_ENV=production node src/server.js",   // Produção local (teste)
  "db:sync": "node src/index.js",                               // Sincronizar banco
  "seed:users": "node src/seed/userSeed.js",                    // Popular usuários fake
  "build": "node src/server.js"
}
👨‍💻 Desenvolvimento
bash
Copiar código
npm run dev
Usa .env.development

Conecta no Postgres local

SSL desabilitado

🧪 Teste de Produção Local
bash
Copiar código
npm run prod
Usa .env.production

Conecta no Neon (cloud)

SSL habilitado

🌍 Produção (Deploy)
bash
Copiar código
npm start
Ambiente de produção real (Render, Railway, etc.)

Conecta no Neon

SSL habilitado

☁️ Deploy
Backend (API)
Recomendado usar:

Render

Railway

Heroku

Passos no Render:

Crie um novo Web Service e conecte seu repositório.

Configure:

Build Command: npm install

Start Command: npm start

Adicione todas as variáveis de .env.production no painel de Environment.

Deploy 🚀

Frontend (Next.js)
Hospedado na Vercel.
Configure no front:

env
Copiar código
NEXT_PUBLIC_API_URL=https://sua-api.onrender.com/api
✅ Conexão com o Banco
A API alterna automaticamente entre local e produção:

js
Copiar código
dialectOptions: process.env.DB_SSL === "true"
  ? { ssl: { require: true, rejectUnauthorized: false } }
  : {}
Local: DB_SSL=false → conecta no PostgreSQL local.

Produção: DB_SSL=true → conecta no Neon (ou outro Postgres cloud).