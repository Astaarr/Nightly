import fs from 'fs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import app from './app.js';

// Paso 1: Cargar primero `.env.local` por defecto
dotenv.config({ path: '.env.local' });

// Paso 2: Si ENVIRONMENT es 'production', sobreescribir con `.env.production`
if (process.env.ENVIRONMENT === 'production') {
  dotenv.config({ path: '.env.production', override: true });
}

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT, ENVIRONMENT } = process.env;

// Mostrar entorno actual
console.log(`🌍 Entorno actual: ${ENVIRONMENT}`);

try {
  // Crear conexión sin especificar la base de datos (por si aún no existe)
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  if (ENVIRONMENT === 'local') {
    // Ejecutar init.sql que crea y selecciona la base de datos
    const initSQL = fs.readFileSync('./db/init.sql', 'utf-8');
    await connection.query(initSQL);
    console.log('✅ Base de datos y tablas creadas/verificadas');
  } else {
    console.log('ℹ️ Entorno de producción: no se ejecuta init.sql');
  }

  // Cierra conexión inicial si ya no la necesitas
  await connection.end();

  // Conexión final con la base de datos ya creada
  const finalConnection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  await finalConnection.end();

  // Arrancar servidor
  const serverPort = PORT || 4000;
  app.listen(serverPort, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${serverPort}`);
  });

} catch (error) {
  console.error('❌ Error al inicializar la app:', error);
}
