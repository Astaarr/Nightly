# 🌃 Nightly

**Tu sitio perfecto para descubrir y reservar actividades o planes nocturnos.**  
Nightly es una plataforma web pensada para que los usuarios puedan explorar actividades, planes nocturnos, reservar entradas y gestionar sus preferencias de forma sencilla y segura.

---

## 📸 Vista previa

![Vista previa de Nightly](demo.gif)

---

## 🧠 ¿Qué es Nightly?

Nightly nace como un proyecto de TFC para resolver una necesidad concreta: **centralizar en una sola web toda la oferta de ocio o planes nocturnos para jóvenes**. La aplicación permite:

- Explorar eventos por ciudad, tipo de música o lugar.
- Ver detalles completos de cada evento.
- Reservar entradas y recibir un correo con QR.
- Gestionar el perfil y avatar del usuario.
- Marcar eventos como favoritos.
- Cancelar reservas y recibir notificación por correo.

---

## ⚙️ Tecnologías utilizadas

### 🖥️ Frontend
- **React** con **Vite**
- **Axios** para peticiones HTTP
- **React Router Dom** para el manejo de rutas
- **JWT** para autenticación

### 🛠️ Backend
- **Node.js + Express**
- **MySQL** como base de datos
- **Nodemailer + MJML** para envío de correos HTML
- **JWT + Middleware** para proteger rutas privadas
- **Multer** para subida de imágenes

### ☁️ Infraestructura
- **AWS EC2** para backend y base de datos
- **Nginx** como proxy inverso
- **PM2** para gestión de procesos
- **Dominio personalizado**: [https://nightly.it.com](https://nightly.it.com)

---

## 🔐 Funcionalidades destacadas

- Registro y login con autenticación JWT
- Subida y gestión de avatar personalizado
- Correos automáticos con diseño responsive:
  - Bienvenida
  - Confirmación de reserva (con código QR)
  - Cancelación de reserva
  - Cambio de contraseña
- Panel de usuario con reservas y favoritos
- Rutas protegidas y persistencia de sesión

---
## 📦 Instalación local

```bash
# Clona el repositorio
git clone https://github.com/Astaarr/Nightly.git
cd Nightly

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
npm install
npm run dev
```
---

## ✅ Estado actual

- ✔️ Proyecto en producción  
- ✔️ Reservas funcionando y correos enviados  
- ✔️ Dominio personalizado activo  
- ✔️ Base de datos sincronizada  

---

## 📌 Pendientes / Futuras mejoras

- Panel de administración para eventos  
- Pasarela de pagos real  
- Mejora en el filtrado de eventos  
- SEO y accesibilidad  

---

## 👨‍💻 Autores

- **Daniel Clavel**  
- **Adrián Arcones**  
- **Yohana Manteca**  

Proyecto final desarrollado en el marco del **Grado Superior de Desarrollo de Aplicaciones Web**.


