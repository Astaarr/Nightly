// backend/controllers/favoritos.controller.js
import { db } from '../db/connection.js';

// GET /api/favoritos
export const getFavoritos = async (req, res) => {
  const id_usuario = req.user.id;

  try {
    const [rows] = await db.query(
      `SELECT l.* FROM favoritos_lugares f
       JOIN lugares l ON f.id_lugar = l.id_lugar
       WHERE f.id_usuario = ?`,
      [id_usuario]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ message: 'Error al obtener favoritos' });
  }
};

// POST /api/favoritos
export const addFavorito = async (req, res) => {
  const id_usuario = req.user.id;
  const { id_lugar } = req.body;

  if (!id_lugar) {
    return res.status(400).json({ message: 'Falta el id_lugar' });
  }

  try {
    await db.query(
      `INSERT IGNORE INTO favoritos_lugares (id_usuario, id_lugar) VALUES (?, ?)`,
      [id_usuario, id_lugar]
    );
    res.status(201).json({ message: 'Favorito añadido' });
  } catch (error) {
    console.error('Error al añadir favorito:', error);
    res.status(500).json({ message: 'Error al añadir favorito' });
  }
};

// DELETE /api/favoritos/:id_lugar
export const removeFavorito = async (req, res) => {
  const id_usuario = req.user.id;
  const { id_lugar } = req.params;

  try {
    await db.query(
      `DELETE FROM favoritos_lugares WHERE id_usuario = ? AND id_lugar = ?`,
      [id_usuario, id_lugar]
    );
    res.json({ message: 'Favorito eliminado' });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    res.status(500).json({ message: 'Error al eliminar favorito' });
  }
};
