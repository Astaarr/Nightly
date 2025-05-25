import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { obtenerReservasUsuario } from "../controllers/reservas.controller.js";

const router = Router();

// Obtener las reservas del usuario autenticado
router.get("/", verifyToken, obtenerReservasUsuario);

export default router;

