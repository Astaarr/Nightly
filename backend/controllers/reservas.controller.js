import { db } from "../db/connection.js";

export const obtenerReservasUsuario = async (req, res) => {
  const { id } = req.user;

  try {
    const [reservas] = await db.query(
      `SELECT r.*, e.nombre_evento, e.descripcion, e.fecha_evento, e.precio_entrada, e.imagen_evento,
              e.tipo_musica, e.dress_code
       FROM reservas_eventos r
       JOIN eventos e ON r.id_evento = e.id_evento
       WHERE r.id_usuario = ?
       ORDER BY r.fecha_reserva DESC`,
      [id]
    );

    res.json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: "Error al cargar las reservas" });
  }
};