import { Router } from "express";
import { filtrarLugares, filtrarEventos } from "../controllers/filtros.controller.js";

const router = Router();

router.get("/lugares", filtrarLugares);
router.get("/eventos", filtrarEventos);

export default router;
