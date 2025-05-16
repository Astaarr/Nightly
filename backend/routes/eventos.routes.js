import express from 'express';
import { getEventos } from '../controllers/eventos.controller.js';

const router = express.Router();

router.get('/', getEventos); // GET /api/eventos

export default router;
