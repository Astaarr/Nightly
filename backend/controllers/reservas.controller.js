import { db } from "../db/connection.js";
import { sendReservaEmail } from '../utils/mailer.js';
import { sendReservaCanceladaEmail } from '../utils/mailer.js';


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
    const [evento] = await db.query(
      `SELECT 
         e.nombre_evento, e.fecha_evento, e.precio_entrada, e.imagen_evento,
         l.direccion, l.nombre AS nombre_lugar, l.ciudad
       FROM eventos e
       JOIN lugares l ON e.id_lugar = l.id_lugar
       WHERE e.id_evento = ? AND e.fecha_evento > NOW()`,
      [id_evento]
    );

    if (evento.length === 0) {
      return res.status(404).json({
        message: "El evento no existe o ya ha pasado"
      });
    }

    const [reservaExistente] = await db.query(
      "SELECT * FROM reservas_eventos WHERE id_usuario = ? AND id_evento = ?",
      [id, id_evento]
    );

    if (reservaExistente.length > 0) {
      return res.status(400).json({
        message: "Ya tienes una reserva para este evento"
      });
    }

    if (!usuario_reserva || !email_reserva) {
      return res.status(400).json({
        message: "El nombre y email del usuario son requeridos"
      });
    }

    const [result] = await db.query(
      "INSERT INTO reservas_eventos (id_usuario, id_evento, fecha_reserva, usuario_reserva, email_reserva) VALUES (?, ?, NOW(), ?, ?)",
      [id, id_evento, usuario_reserva, email_reserva]
    );

    // Enviar correo de forma asíncrona
    sendReservaEmail({
      to: email_reserva,
      name: usuario_reserva,
      evento: {
        nombre_evento: evento[0].nombre_evento,
        fecha_evento: evento[0].fecha_evento,
        precio_entrada: evento[0].precio_entrada,
        imagen_evento: evento[0].imagen_evento,
        direccion: evento[0].direccion,
        nombre_lugar: evento[0].nombre_lugar,
        ciudad: evento[0].ciudad
      }
    }).catch(error => {
      console.error("Error al enviar correo de confirmación:", error);
      // No lanzamos el error para no afectar la respuesta al cliente
    });

    // Respondemos inmediatamente sin esperar al envío del correo
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
    const [reserva] = await db.query(
      "SELECT * FROM reservas_eventos WHERE id_usuario = ? AND id_evento = ?",
      [id, id_evento]
    );

    if (reserva.length === 0) {
      return res.status(404).json({
        message: "No se encontró la reserva"
      });
    }

    const [evento] = await db.query(
      `SELECT 
         e.nombre_evento, e.fecha_evento, e.imagen_evento,
         l.nombre AS nombre_lugar, l.ciudad
       FROM eventos e
       JOIN lugares l ON e.id_lugar = l.id_lugar
       WHERE e.id_evento = ?`,
      [id_evento]
    );

    if (evento.length > 0) {
      const datosCorreo = {
        to: reserva[0].email_reserva,
        name: reserva[0].usuario_reserva,
        evento: {
          nombre_evento: evento[0].nombre_evento,
          fecha_evento: evento[0].fecha_evento,
          imagen_evento: `https://nightly.it.com/images/eventos/${evento[0].imagen_evento}`,
          nombre_lugar: evento[0].nombre_lugar,
          ciudad: evento[0].ciudad,
        },
      };      

      // Enviar el correo de cancelación (sin bloquear la respuesta)
      sendReservaCanceladaEmail(datosCorreo).catch(err =>
        console.error("❌ Error al enviar correo de cancelación:", err)
      );
    }

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

