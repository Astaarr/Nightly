import { db } from '../db/connection.js';

// Función para traer todos los eventos
export const getEventos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM eventos');
    res.json(rows); // Devolvemos los eventos como JSON
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
