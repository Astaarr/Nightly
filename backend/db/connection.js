// backend/db/connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Crear un pool de conexiones (mejor que una sola)
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
