// backend/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import lugaresRoutes from './routes/lugares.routes.js';
import eventosRoutes from './routes/eventos.routes.js'
import favoritosRoutes from './routes/favoritos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import reservasRoutes from "./routes/reservas.routes.js";
import filtrosRoutes from './routes/filtros.routes.js';



const app = express();

// Para usar __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos (por ejemplo, imágenes)
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/lugares', lugaresRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
app.use("/api/reservas", reservasRoutes);
app.use('/api/filtros', filtrosRoutes);



// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

export default app;
