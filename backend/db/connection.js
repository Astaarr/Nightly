// backend/db/connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';

// Detectar si usar `.env.local` o `.env.production`
const envPath = fs.existsSync('.env.local') ? '.env.local' : '.env.production';
dotenv.config({ path: envPath });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Validar variables críticas
if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('❌ Faltan variables de entorno para la conexión a la base de datos');
}

// Crear un pool de conexiones
const db = await mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('📡 Conexión a la base de datos establecida');

export { db };
