// backend/routes/favoritos.routes.js
import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import {
  getFavoritos,
  addFavorito,
  removeFavorito
} from '../controllers/favoritos.controller.js';

const router = express.Router();

router.get('/', verifyToken, getFavoritos);
router.post('/', verifyToken, addFavorito);
router.delete('/:id_lugar', verifyToken, removeFavorito);

export default router;
