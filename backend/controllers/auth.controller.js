import bcrypt from 'bcryptjs';
import { db } from '../db/connection.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    // Si el usuario no existe
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Verifica los valores antes de continuar
    console.log('Usuario encontrado:', user);
    console.log('Contraseña recibida:', password);
    console.log('Contraseña hasheada en la base de datos:', user.password_hash);

    // Verificar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Si la contraseña es correcta, responder con el mensaje de éxito
    res.status(200).json({ message: 'Login exitoso', user });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
