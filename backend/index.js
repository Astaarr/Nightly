import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const {
  ENVIRONMENT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  RAILWAY_DB_HOST,
  RAILWAY_DB_PORT,
  RAILWAY_DB_USER,
  RAILWAY_DB_PASSWORD,
  RAILWAY_DB_NAME,
  PORT
} = process.env;

// 🔁 Configuración dinámica según entorno
const dbConfig = ENVIRONMENT === 'production'
  ? {
      host: RAILWAY_DB_HOST,
      port: RAILWAY_DB_PORT,
      user: RAILWAY_DB_USER,
      password: RAILWAY_DB_PASSWORD,
      database: RAILWAY_DB_NAME
    }
  : {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    };

try {
  const connection = await mysql.createConnection({
    ...dbConfig,
    multipleStatements: true
  });

  console.log('📡 Conexión a la base de datos establecida');

  // Ejecutar init.sql solo en local
  if (ENVIRONMENT === 'local') {
    const initSQL = fs.readFileSync('./db/init.sql', 'utf-8');
    await connection.query(initSQL);
    console.log('✅ Script init.sql ejecutado');
  }

  const serverPort = PORT || 4000;
  app.listen(serverPort, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${serverPort}`);
  });

} catch (error) {
  console.error('❌ Error al conectar con la base de datos:', error);
}
