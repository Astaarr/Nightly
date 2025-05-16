import { db } from '../db/connection.js';

// Función para traer todos los locales
export const getLugares = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM lugares');
    res.json(rows); // Devolvemos los lugares como JSON
  } catch (error) {
    console.error('Error obteniendo lugares:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
