// backend/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Cargar variables de entorno
dotenv.config();

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import lugaresRoutes from './routes/lugares.routes.js';
import eventosRoutes from './routes/eventos.routes.js';
import favoritosRoutes from './routes/favoritos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import reservasRoutes from './routes/reservas.routes.js';
import filtrosRoutes from './routes/filtros.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import placeFinderRoutes from './routes/place-finder.js';

const app = express();

// Para usar __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware CORS dinámico según el entorno
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
app.use('/qrs', express.static(path.join(__dirname, 'public', 'qrs')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/lugares', lugaresRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/filtros', filtrosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/place-finder', placeFinderRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

export default app;
