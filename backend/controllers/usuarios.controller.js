import bcrypt from 'bcrypt';
import { db } from '../db/connection.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { sendPasswordChangedEmail } from '../utils/mailer.js';

// Cambiar contraseña
export const cambiarPassword = async (req, res) => {
  const { id } = req.user;
  const { actual, nueva } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT password_hash FROM usuarios WHERE id = ?',
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(actual, rows[0].password_hash);
    if (!match)
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });

    const nuevaHash = await bcrypt.hash(nueva, 10);
    await db.query('UPDATE usuarios SET password_hash = ? WHERE id = ?', [
      nuevaHash,
      id,
    ]);

    // Obtener datos del usuario para el correo
    const [[usuario]] = await db.query(
      'SELECT nombre, email FROM usuarios WHERE id = ?',
      [id]
    );

    // Enviar correo de confirmación (no bloqueante)
    sendPasswordChangedEmail({
      to: usuario.email,
      name: usuario.nombre
    }).catch(err =>
      console.error("❌ Error al enviar correo de cambio de contraseña:", err)
    );

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar nombre del perfil
export const actualizarPerfil = async (req, res) => {
  const { id } = req.user;
  const { nombre } = req.body;

  try {
    await db.query(
      'UPDATE usuarios SET nombre = ? WHERE id = ?',
      [nombre, id]
    );

    res.json({ message: 'Datos actualizados correctamente' });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error al actualizar datos del usuario' });
  }
};

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/avatars';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `user_${req.user.id}${ext}`);
  }
});

// Filtro de archivos para permitir solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

// Configuración de multer con límite de tamaño (5MB)
export const uploadAvatar = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB en bytes
  },
  fileFilter
}).single('avatar');

// Subir avatar y actualizar en la base de datos
export const subirAvatar = async (req, res) => {
  const { id } = req.user;
  
  // Verificar si el archivo fue subido correctamente
  if (!req.file) {
    return res.status(400).json({ 
      message: 'No se pudo procesar el archivo. Asegúrate de que sea una imagen válida y no supere los 5MB.' 
    });
  }

  const fileName = req.file.filename;

  try {
    await db.query('UPDATE usuarios SET avatar_url = ? WHERE id = ?', [
      `avatars/${fileName}`,
      id,
    ]);

    res.json({
      message: 'Avatar actualizado correctamente',
      avatarUrl: `avatars/${fileName}`
    });
  } catch (error) {
    console.error('Error al subir avatar:', error);
    res.status(500).json({ message: 'Error al actualizar avatar' });
  }
};
