import nodemailer from 'nodemailer';
import mjml from 'mjml';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Configurar dotenv
dotenv.config();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para enviar el correo de bienvenida
export const sendWelcomeEmail = async ({ to, name }) => {
  try {
    // Ruta de la plantilla MJML
    const templatePath = path.join(__dirname, '../templates/welcome.mjml');

    // Leer y procesar la plantilla
    const mjmlTemplate = fs.readFileSync(templatePath, 'utf-8');
    const personalizedMJML = mjmlTemplate.replace('{{name}}', name);
    const { html } = mjml(personalizedMJML);

    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configurar el correo
    const mailOptions = {
      from: `"Nightly" <${process.env.EMAIL_USER}>`,
      to,
      subject: '🎉 ¡Bienvenido a Nightly!',
      html,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado a ${to}`);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    throw error;
  }
};
