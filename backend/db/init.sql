-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS nightly CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nightly;

-- Crear la tabla 'usuarios' si no existe
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de prueba si no existen
INSERT IGNORE INTO usuarios (nombre, email, password_hash, fecha_nacimiento)
VALUES 
    ('Juan Pérez', 'juan@dominio.com', '$2a$10$WZcbnM.Cf0zA.Tbm4M32u4z3t4MkGxH6Lx9BQ3zBGrlBNCevhY2eC', '1995-04-20'), -- contraseña: prueba123
    ('Carlos García', 'carlos@dominio.com', '$2a$10$WZcbnM.Cf0zA.Tbm4M32u4z3t4MkGxH6Lx9BQ3zBGrlBNCevhY2eC', '1998-06-15'), -- contraseña: prueba123
    ('Laura Jiménez', 'laura@dominio.com', '$2a$10$WZcbnM.Cf0zA.Tbm4M32u4z3t4MkGxH6Lx9BQ3zBGrlBNCevhY2eC', '2000-12-05'); -- contraseña: prueba123

-- Crear la tabla 'admin' si no existe
CREATE TABLE IF NOT EXISTS admin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insertar administradores de prueba si no existen
INSERT IGNORE INTO admin (email, password)
VALUES 
    ('admin1@dominio.com', '$2a$10$WZcbnM.Cf0zA.Tbm4M32u4z3t4MkGxH6Lx9BQ3zBGrlBNCevhY2eC'), -- contraseña: admin123
    ('admin2@dominio.com', '$2a$10$WZcbnM.Cf0zA.Tbm4M32u4z3t4MkGxH6Lx9BQ3zBGrlBNCevhY2eC'); -- contraseña: admin123

-- Crear la tabla 'clientes' si no existe
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(100) NOT NULL UNIQUE,
    password_hash_cliente VARCHAR(255) NOT NULL,
    telefono_cliente VARCHAR(16),
    direccion_cliente TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar clientes de prueba si no existen
INSERT IGNORE INTO clientes (nombre_cliente, email_cliente, password_hash_cliente, telefono_cliente, direccion_cliente)
VALUES 
    ('Discoteca Eclipse', 'eclipse@discoteca.com','$2b$12$UD2IPb0AmjUnNcOb8bpdw.AgABOzZqPFGmB9azyMumAHcs623CgWS', '600123456', 'Calle Mayor 123, Madrid'), -- contraseña: cliente123
    ('Discoteca Vortex', 'vortex@discoteca.com','$2b$12$x2XNpMOgubsjQLEA/JNYDedTPvwd1mJeV9nsGk2ZyK2ok7Q.MbmjO', '611987654', 'Avenida del Sol 456, Madrid'), -- contraseña: cliente456
    ('Discoteca Neon', 'neon@discoteca.com','$2b$12$iDYVB5YE4.91u6/dDGzRHuqgmI6Xx8F8axxVp7D9f6q0Vf7Q.qJv6', '622345678', 'Calle Luna 789, Barcelona'); -- contraseña: cliente789

-- Crear la tabla 'discotecas' si no existe
CREATE TABLE IF NOT EXISTS discotecas (
    id_discoteca INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    rango_precio ENUM('Barato', 'Medio', 'Caro') DEFAULT 'Medio',
    estilo_vestimenta VARCHAR(100),
    tipo_musica VARCHAR(100),
    foto_portada TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
);

-- Insertar discotecas de prueba si no existen
INSERT IGNORE INTO discotecas (id_cliente, nombre, descripcion, direccion, ciudad, rango_precio, estilo_vestimenta, tipo_musica, foto_portada)
VALUES 
    (1, 'Eclipse Club', 'La mejor discoteca de Madrid', 'Calle Principal 123', 'Madrid', 'Caro', 'Elegante', 'Electrónica', 'eclipse.png'),
    (2, 'Vortex Night', 'Ambiente urbano y moderno', 'Avenida Sol 456', 'Madrid', 'Medio', 'Casual', 'Reggaeton', 'vortex.png'),
    (3, 'Neon Party', 'Fiestas temáticas y luces neón', 'Plaza Central 789', 'Barcelona', 'Barato', 'Casual', 'Pop', 'neon.png');

-- Crear la tabla 'eventos' si no existe
CREATE TABLE IF NOT EXISTS eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    id_discoteca INT NOT NULL,
    nombre_evento VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_evento DATE NOT NULL,
    precio_entrada DECIMAL(6,2),
    tipo_musica VARCHAR(100),
    dress_code VARCHAR(100),
    imagen_evento TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_discoteca) REFERENCES discotecas(id_discoteca) ON DELETE CASCADE
);

-- Insertar eventos de prueba si no existen
INSERT IGNORE INTO eventos (id_discoteca, nombre_evento, descripcion, fecha_evento, precio_entrada, tipo_musica, dress_code, imagen_evento)
VALUES 
    (1, 'Fiesta Electrónica', 'La mejor música electrónica con DJ internacional', '2025-06-20', 20.00, 'Electrónica', 'Elegante', 'fiesta_electronica.jpg'),
    (2, 'Noche de Reggaeton', 'Baila los mejores hits de reggaeton toda la noche', '2025-07-15', 15.00, 'Reggaeton', 'Casual', 'noche_reggaeton.jpg'),
    (3, 'Fiesta Neón', 'Luces, neón y diversión asegurada', '2025-08-10', 10.00, 'Pop', 'Casual', 'fiesta_neon.jpg');
