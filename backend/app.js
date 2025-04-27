// backend/app.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';  // <-- Importar las rutas de login
import discotecasRoutes from './routes/discotecas.routes.js';  // <-- Importar las rutas de discotecas
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

// Para usar __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir la carpeta 'public/images'
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);  // <-- Añadir las rutas para el login
app.use('/api/discotecas', discotecasRoutes);  // <-- Añadir las rutas para las discotecas

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀' });
});

export default app;
