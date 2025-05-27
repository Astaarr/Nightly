import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { 
  obtenerReservasUsuario,
  crearReserva,
  eliminarReserva
} from "../controllers/reservas.controller.js";

const router = Router();

// Obtener las reservas del usuario autenticado
router.get("/", verifyToken, obtenerReservasUsuario);

// Crear una nueva reserva
router.post("/", verifyToken, crearReserva);

// Eliminar una reserva
router.delete("/:id_evento", verifyToken, eliminarReserva);

export default router;

