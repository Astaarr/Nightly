import { Router } from 'express';
import { loginUser } from '../controllers/auth.controller.js';

const router = Router();

// Ruta para login
router.post('/login', loginUser);

export default router;
