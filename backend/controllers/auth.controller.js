import { db } from '../db/connection.js';
import bcrypt from 'bcrypt';

// Función para iniciar sesións
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña no válidos' });
    }

    // Verificar la contraseñas
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Correo o contraseña no válidos' });
    }

    // Posiblemente generemos un token JWT para enviarlo al cliente (Veremos si lo implementamos)ss
    res.json({ message: 'Inicio de sesión correcto', user: { id: user.id, nombre: user.nombre } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Función para registrar un nuevo usuarios
export const register = async (req, res) => {
  const { nombre, email, password, fecha_nacimiento } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO usuarios (nombre, email, password_hash, fecha_nacimiento) VALUES (?, ?, ?, ?)', [nombre, email, hashedPassword, fecha_nacimiento]);

    res.json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};