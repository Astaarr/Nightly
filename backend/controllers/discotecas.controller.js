import { db } from '../db/connection.js';

// Función para traer todas las discotecas
export const getDiscotecas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM discotecas');
    res.json(rows); // Devolvemos las discotecas como JSON
  } catch (error) {
    console.error('Error obteniendo discotecas:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
