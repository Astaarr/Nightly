import jwt from 'jsonwebtoken';
import { db } from '../db/connection.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { sendWelcomeEmail } from '../utils/mailer.js';

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET;

// Función para iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const [rows] = await db.query(
      'SELECT id, nombre, email, password_hash, avatar_url FROM usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Correo o contraseña no válidos' });
    }

    const user = rows[0];

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Correo o contraseña no válidos' });
    }

    // Devolver los datos necesarios del usuario
    // Crear el token con datos mínimos del usuario
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' } // puedes ajustar el tiempo
    );

    // Devolver respuesta con token
    res.status(200).json({
      message: 'Inicio de sesión correcto',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        avatar_url: user.avatar_url
      },
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  const { nombre, email, password, fecha_nacimiento } = req.body;

  try {
    // Verificar si el email ya existe
    const [existing] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Ya existe una cuenta con ese correo' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await db.query(
      'INSERT INTO usuarios (nombre, email, password_hash, fecha_nacimiento) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, fecha_nacimiento]
    );

    // Enviar correo de bienvenida
    await sendWelcomeEmail({ to: email, name: nombre });

    res.status(200).json({ message: 'Registro exitoso y correo enviado' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

