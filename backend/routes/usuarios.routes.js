import { Router } from "express";
import {
  cambiarPassword,
  actualizarPerfil,
  subirAvatar,
  uploadAvatar,
} from "../controllers/usuarios.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

// Cambiar contraseña
router.put("/cambiar-password", verifyToken, cambiarPassword);

// Actualizar nombre y email
router.put("/perfil", verifyToken, actualizarPerfil);

// Subir o actualizar avatar
router.post("/avatar", verifyToken, uploadAvatar, subirAvatar);

export default router;
