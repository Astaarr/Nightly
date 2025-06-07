import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import app from './app.js';

// Detectar entorno y cargar el .env correcto
const envFile = process.env.ENVIRONMENT === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, ENVIRONMENT } = process.env;

try {
  // Crear la conexión
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  if (ENVIRONMENT === 'local') {
    // Solo en desarrollo: ejecutar init.sql
    const initSQL = fs.readFileSync('./db/init.sql', 'utf-8');
    await connection.query(initSQL);
    console.log('✅ Base de datos y tablas creadas/verificadas');
  } else {
    console.log('ℹ️ Entorno de producción: no se ejecuta init.sql');
  }

  // Arrancar servidor
  const serverPort = PORT || 4000;
  app.listen(serverPort, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${serverPort}`);
  });

} catch (error) {
  console.error('❌ Error al inicializar la app:', error);
}
