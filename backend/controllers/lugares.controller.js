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

// Función para obtener un lugar específico por ID
export const getLugarById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM lugares WHERE id_lugar = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error obteniendo lugar:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
