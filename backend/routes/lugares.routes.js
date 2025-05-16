import express from 'express';
import { getLugares } from '../controllers/lugares.controller.js';

const router = express.Router();

router.get('/', getLugares); // GET /api/lugares

export default router;
