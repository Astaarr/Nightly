import { db } from '../db/connection.js';

// Función para traer todos los eventos
export const getEventos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        eventos.*, 
        lugares.nombre AS nombre_lugar
      FROM eventos
      JOIN lugares ON eventos.id_lugar = lugares.id_lugar
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Función para obtener un evento específico por ID
export const getEventoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT 
        eventos.*, 
        lugares.nombre AS nombre_lugar
      FROM eventos
      JOIN lugares ON eventos.id_lugar = lugares.id_lugar
      WHERE eventos.id_evento = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error obteniendo evento:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
