import { Sequelize } from 'sequelize';
import 'dotenv/config';


export const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASS,
{
host: process.env.DB_HOST,
port: Number(process.env.DB_PORT || 5432),
dialect: 'postgres',
logging: process.env.NODE_ENV === 'development' ? console.log : false,
define: {
underscored: false,
freezeTableName: true,
timestamps: false,
},
}
);


export async function checkDb() {
await sequelize.authenticate();
console.log('[DB] Conectado ao Postgres');
}