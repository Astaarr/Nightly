import { db } from '../db/connection.js';

// Utilidad para formatear el precio según su valor numérico
function mapPrecio(precioDecimal) {
  const precio = parseFloat(precioDecimal);
  if (precio < 15) return '€';
  if (precio <= 20) return '€€';
  return '€€€';
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

    // Categorías del lugar
    const [categorias] = await db.query(
      `SELECT nombre_categoria FROM categorias WHERE id_categoria = ?`,
      [lugar.id_categoria]
    );
    lugar.categorias = categorias.map(c => c.nombre_categoria);

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
