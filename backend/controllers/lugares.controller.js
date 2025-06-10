import { db } from '../db/connection.js';

// Utilidad para formatear el precio según su valor enum
function mapPrecio(precioEnum) {
  if (precioEnum === 'bajo') return '€';
  if (precioEnum === 'medio') return '€€';
  if (precioEnum === 'alto') return '€€€';
  return '€€'; // valor por defecto
}

// Función para traer todos los locales
export const getLugares = async (req, res) => {
  const { categoria } = req.query;

  let query = "SELECT DISTINCT l.* FROM lugares l";
  const params = [];

  if (categoria) {
    // Si se especifica una categoría, incluir tanto:
    // 1. Lugares que pertenecen directamente a esa categoría (l.id_categoria = categoria)
    // 2. Lugares que pertenecen a subcategorías de esa categoría (c.parent_id = categoria)
    // Esto permite mostrar lugares de categorías principales (1-5) junto con sus subcategorías (6-23)
    query += `
      LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
      WHERE (l.id_categoria = ? OR c.parent_id = ?)
    `;
    params.push(categoria, categoria);
  }

  try {
    const [rows] = await db.query(query, params);

    // Mapear el precio al formato visual (€€)
    const lugaresConPrecioFormateado = rows.map(lugar => ({
      ...lugar,
      precio: mapPrecio(lugar.precio)
    }));

    res.json(lugaresConPrecioFormateado);
  } catch (error) {
    console.error('Error obteniendo lugares:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Función para obtener un lugar específico por ID con datos ampliados
export const getLugarById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || null;

  try {
    // Obtener el lugar principal
    const [lugares] = await db.query('SELECT * FROM lugares WHERE id_lugar = ?', [id]);
    if (lugares.length === 0) {
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    const lugar = lugares[0];

    // Formatear precio
    lugar.precio = mapPrecio(lugar.precio);

    // Categorías del lugar (subcategoría y categoría principal)
    const [categorias] = await db.query(
      `SELECT 
         c.nombre_categoria as subcategoria,
         cp.nombre_categoria as categoria_principal
       FROM categorias c
       LEFT JOIN categorias cp ON c.parent_id = cp.id_categoria
       WHERE c.id_categoria = ?`,
      [lugar.id_categoria]
    );
    
    if (categorias.length > 0) {
      const categoriaInfo = categorias[0];
      lugar.categorias = [];
      
      // Añadir categoría principal si existe
      if (categoriaInfo.categoria_principal) {
        lugar.categorias.push(categoriaInfo.categoria_principal);
      }
      
      // Añadir subcategoría
      lugar.categorias.push(categoriaInfo.subcategoria);
    } else {
      lugar.categorias = [];
    }

    // Horarios del lugar
    const [horarios] = await db.query(
      `SELECT dia, hora_apertura, hora_cierre FROM horarios_lugar WHERE id_lugar = ?`,
      [id]
    );
    lugar.horarios = horarios;

    // Si está en favoritos
    if (userId) {
      const [favorito] = await db.query(
        `SELECT 1 FROM favoritos_lugares WHERE id_usuario = ? AND id_lugar = ?`,
        [userId, id]
      );
      lugar.esFavorito = favorito.length > 0;
    } else {
      lugar.esFavorito = false;
    }

    res.json(lugar);
  } catch (error) {
    console.error('Error obteniendo lugar:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
