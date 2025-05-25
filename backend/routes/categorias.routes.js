import express from 'express';
import { 
  getCategorias, 
  getCategoriasPrincipales, 
  getSubcategorias 
} from '../controllers/categorias.controller.js';

const router = express.Router();

// Obtener todas las categorías
router.get('/', getCategorias);

// Obtener solo categorías principales (sin parent_id)
router.get('/principales', getCategoriasPrincipales);

// Obtener subcategorías de una categoría principal
router.get('/subcategorias/:id', getSubcategorias);

export default router;