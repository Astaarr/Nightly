import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import app from './app.js'; // <<-- Importar app.js para arrancar Express

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;

// Crear la conexión a la base de datos
const connection = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  multipleStatements: true,
});

// Leer el archivo init.sql
const initSQL = fs.readFileSync('./db/init.sql', 'utf-8');

try {
  // Ejecutar el script SQL para crear la base de datos y las tablas
  await connection.query(initSQL);
  console.log('✅ Base de datos y tablas creadas/verificadas');
  
  // Ahora arrancamos el servidor
  const serverPort = PORT || 4000;
  app.listen(serverPort, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${serverPort}`);
  });

} catch (error) {
  console.error('❌ Error al ejecutar el archivo SQL:', error);
}
