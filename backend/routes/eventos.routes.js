import express from 'express';
import { getEventos, getEventoById } from '../controllers/eventos.controller.js';

const router = express.Router();

router.get('/', getEventos); // GET /api/eventos
router.get('/:id', getEventoById); // GET /api/eventos/:id

export default router;
