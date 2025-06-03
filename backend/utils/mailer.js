import nodemailer from 'nodemailer';
import mjml from 'mjml';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bienvenida
export const sendWelcomeEmail = async ({ to, name }) => {
  try {
    const templatePath = path.join(__dirname, '../templates/welcome.mjml');
    const mjmlTemplate = fs.readFileSync(templatePath, 'utf-8');
    const personalizedMJML = mjmlTemplate.replace('{{name}}', name);
    const { html } = mjml(personalizedMJML);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Nightly" <${process.env.EMAIL_USER}>`,
      to,
      subject: '🎉 ¡Bienvenido a Nightly!',
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Correo de bienvenida enviado a ${to}`);
  } catch (error) {
    console.error('❌ Error al enviar el correo de bienvenida:', error);
    throw error;
  }
};

// Confirmación de reserva
export const sendReservaEmail = async ({ to, name, evento }) => {
    try {
      const templatePath = path.join(__dirname, '../templates/reserva-confirmada.mjml');
      let mjmlTemplate = fs.readFileSync(templatePath, 'utf-8');
  
      // Crear un nombre único para el archivo QR
      const qrFilename = `qr-${uuidv4()}.png`;
      const qrPath = path.join(__dirname, '../public/qrs', qrFilename);
      const qrUrl = `${process.env.BASE_URL}/qrs/${qrFilename}`;
  
      // Generar el archivo QR en el disco
      const qrContent = `Reserva de ${name} para ${evento.nombre_evento} el ${evento.fecha_evento}`;
      await QRCode.toFile(qrPath, qrContent);
  
      // Sustituir placeholders
      mjmlTemplate = mjmlTemplate
        .replaceAll('{{name}}', name)
        .replaceAll('{{evento}}', evento.nombre_evento)
        .replaceAll('{{fecha}}', new Date(evento.fecha_evento).toLocaleString('es-ES'))
        .replaceAll('{{precio}}', parseFloat(evento.precio_entrada || 0).toFixed(2))
        .replaceAll('{{direccion}}', evento.direccion || '')
        .replaceAll('{{lugar}}', evento.nombre_lugar || '')
        .replaceAll('{{ciudad}}', evento.ciudad || '')
        .replaceAll('{{imagen_evento}}', `${process.env.BASE_URL}/images/eventos/${evento.imagen_evento}` || 'https://via.placeholder.com/600x300?text=Sin+imagen')
        .replaceAll('{{qr}}', qrUrl);
  
      const { html } = mjml(mjmlTemplate);
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: `"Nightly" <${process.env.EMAIL_USER}>`,
        to,
        subject: `🎟️ Confirmación de tu reserva: ${evento.nombre_evento}`,
        html,
      };
  
      await transporter.sendMail(mailOptions);
      console.log(`✅ Correo de reserva enviado a ${to}`);
    } catch (error) {
      console.error('❌ Error al enviar correo de reserva:', error);
      throw error;
    }
  };