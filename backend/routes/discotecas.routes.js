import { Router } from 'express';
import { getDiscotecas } from '../controllers/discotecas.controller.js';

const router = Router();

// Ruta: GET /api/discotecas
router.get('/', getDiscotecas);

export default router;
