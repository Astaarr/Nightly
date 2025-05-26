import express from 'express';
import { getLugares, getLugarById } from '../controllers/lugares.controller.js';

const router = express.Router();

router.get('/', getLugares); // GET /api/lugares
router.get('/:id', getLugarById); // GET /api/lugares/:id

export default router;
