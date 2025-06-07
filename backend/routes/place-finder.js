import express from 'express';
import { db } from '../db/connection.js';

const router = express.Router();

// Obtener todas las categorías principales (sin parent_id)
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.execute(`
      SELECT id_categoria, nombre_categoria, descripcion, icono 
      FROM categorias 
      WHERE parent_id IS NULL
      ORDER BY nombre_categoria
    `);
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las categorías'
    });
  }
});

// Obtener subcategorías de una categoría específica
router.get('/categories/:categoryId/subcategories', async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const [subcategories] = await db.execute(`
      SELECT id_categoria, nombre_categoria, descripcion, icono 
      FROM categorias 
      WHERE parent_id = ?
      ORDER BY nombre_categoria
    `, [categoryId]);
    
    res.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    console.error('Error obteniendo subcategorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las subcategorías'
    });
  }
});

// Buscar lugares con filtros
router.post('/places/search', async (req, res) => {
  try {
    const {
      categoryId,
      minAge,
      maxAge,
      groupSize,
      environment,
      formality
    } = req.body;

    // Construir la consulta base
    let query = `
      SELECT 
        l.id_lugar,
        l.nombre,
        l.descripcion,
        l.direccion,
        l.ciudad,
        l.url_imagen,
        l.precio,
        l.valoracion,
        l.edad_minima,
        l.edad_maxima,
        l.nivel_formalidad,
        l.ambiente,
        l.tamano_grupo,
        c.nombre_categoria as subcategoria,
        cp.nombre_categoria as categoria_principal
      FROM lugares l
      LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
      LEFT JOIN categorias cp ON c.parent_id = cp.id_categoria
      WHERE 1=1
    `;

    const params = [];

    // Filtrar por categoría (subcategoría)
    if (categoryId) {
      query += ` AND l.id_categoria = ?`;
      params.push(categoryId);
    }

    // Filtrar por rango de edad
    if (minAge !== undefined && maxAge !== undefined) {
      query += ` AND l.edad_minima <= ? AND l.edad_maxima >= ?`;
      params.push(maxAge, minAge);
    }

    // Filtrar por tamaño de grupo
    if (groupSize) {
      query += ` AND l.tamano_grupo = ?`;
      params.push(groupSize.toLowerCase());
    }

    // Filtrar por ambiente
    if (environment) {
      const environmentMap = {
        'Familiar': 'familiar',
        'Romántico': 'romantico',
        'Tranquilo': 'tranquilo',
        'Animado': 'animado'
      };
      query += ` AND l.ambiente = ?`;
      params.push(environmentMap[environment] || environment.toLowerCase());
    }

    // Filtrar por nivel de formalidad
    if (formality) {
      const formalityMap = {
        'Formal': 'formal',
        'Neutro': 'neutro',
        'Informal': 'informal'
      };
      query += ` AND l.nivel_formalidad = ?`;
      params.push(formalityMap[formality] || formality.toLowerCase());
    }

    query += ` ORDER BY l.valoracion DESC, l.nombre`;

    const [places] = await db.execute(query, params);
    
    res.json({
      success: true,
      data: places,
      count: places.length
    });

  } catch (error) {
    console.error('Error buscando lugares:', error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar lugares'
    });
  }
});

// Obtener detalles de un lugar específico
router.get('/places/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    
    const [places] = await db.execute(`
      SELECT 
        l.*,
        c.nombre_categoria as subcategoria,
        cp.nombre_categoria as categoria_principal
      FROM lugares l
      LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
      LEFT JOIN categorias cp ON c.parent_id = cp.id_categoria
      WHERE l.id_lugar = ?
    `, [placeId]);

    if (places.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lugar no encontrado'
      });
    }

    res.json({
      success: true,
      data: places[0]
    });

  } catch (error) {
    console.error('Error obteniendo lugar:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el lugar'
    });
  }
});

export default router; 