import { db } from '../db/connection.js';

// Función para obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categorias');
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Función para obtener solo las categorías principales (sin parent_id)
export const getCategoriasPrincipales = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categorias WHERE parent_id IS NULL');
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo categorías principales:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Función para obtener subcategorías de una categoría principal
export const getSubcategorias = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [rows] = await db.query('SELECT * FROM categorias WHERE parent_id = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo subcategorías:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};