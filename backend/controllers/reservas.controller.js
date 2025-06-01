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

export const crearReserva = async (req, res) => {
  const { id } = req.user;
  const { id_evento, usuario_reserva, email_reserva } = req.body;

  try {
    // Verificar si el evento existe y está disponible
    const [evento] = await db.query(
      "SELECT * FROM eventos WHERE id_evento = ? AND fecha_evento > NOW()",
      [id_evento]
    );

    if (evento.length === 0) {
      return res.status(404).json({ 
        message: "El evento no existe o ya ha pasado" 
      });
    }

    // Verificar si el usuario ya tiene una reserva para este evento
    const [reservaExistente] = await db.query(
      "SELECT * FROM reservas_eventos WHERE id_usuario = ? AND id_evento = ?",
      [id, id_evento]
    );

    if (reservaExistente.length > 0) {
      return res.status(400).json({ 
        message: "Ya tienes una reserva para este evento" 
      });
    }

    // Validar que se proporcionaron los datos necesarios
    if (!usuario_reserva || !email_reserva) {
      return res.status(400).json({
        message: "El nombre y email del usuario son requeridos"
      });
    }

    // Crear la reserva con los nuevos campos
    const [result] = await db.query(
      "INSERT INTO reservas_eventos (id_usuario, id_evento, fecha_reserva, usuario_reserva, email_reserva) VALUES (?, ?, NOW(), ?, ?)",
      [id, id_evento, usuario_reserva, email_reserva]
    );

    res.status(201).json({ 
      message: "Reserva creada exitosamente",
      id_reserva: result.insertId 
    });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ message: "Error al crear la reserva" });
  }
};

export const eliminarReserva = async (req, res) => {
  const { id } = req.user;
  const { id_evento } = req.params;

  try {
    // Verificar si la reserva existe y pertenece al usuario
    const [reserva] = await db.query(
      "SELECT * FROM reservas_eventos WHERE id_usuario = ? AND id_evento = ?",
      [id, id_evento]
    );

    if (reserva.length === 0) {
      return res.status(404).json({ 
        message: "No se encontró la reserva" 
      });
    }

    // Eliminar la reserva
    await db.query(
      "DELETE FROM reservas_eventos WHERE id_usuario = ? AND id_evento = ?",
      [id, id_evento]
    );

    res.json({ message: "Reserva eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar reserva:", error);
    res.status(500).json({ message: "Error al eliminar la reserva" });
  }
};