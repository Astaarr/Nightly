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
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de prueba si no existen
INSERT IGNORE INTO usuarios (nombre, email, password_hash, fecha_nacimiento, avatar_url)
VALUES 
    ('Juan Pérez', 'juan@dominio.com', '$2a$10$hashdeprueba1', '1995-04-20', 'avatars/user_1.png'), -- contraseña: prueba123
    ('Carlos García', 'carlos@dominio.com', '$2a$10$hashdeprueba2', '1998-06-15', 'avatars/user_2.png'), -- contraseña: prueba123
    ('Laura Jiménez', 'laura@dominio.com', '$2a$10$hashdeprueba3', '2000-12-05', 'avatars/user_3.png'); -- contraseña: prueba123


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
    ('Discoteca Eclipse', 'eclipse@discoteca.com','$2b$12$clientehash1', '600123456', 'Calle Mayor 123, Madrid'), -- contraseña: cliente123
    ('Discoteca Vortex', 'vortex@discoteca.com','$2b$12$clientehash2', '611987654', 'Avenida del Sol 456, Madrid'), -- contraseña: cliente456
    ('Discoteca Neon', 'neon@discoteca.com','$2b$12$clientehash3', '622345678', 'Calle Luna 789, Barcelona'); -- contraseña: cliente789

-- Crear la tabla 'categorias' si no existe
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(255),
    parent_id INT DEFAULT NULL,
    FOREIGN KEY (parent_id) REFERENCES categorias(id_categoria) ON DELETE SET NULL
);

-- Insertar categorías principales
INSERT IGNORE INTO categorias (nombre_categoria, descripcion, icono) VALUES
('Salir de fiesta', 'Discotecas y fiestas nocturnas', 'https://cdn.example.com/icons/fiesta.png'),
('Tomar algo', 'Bares, rooftops y pubs', 'https://cdn.example.com/icons/tomar_algo.png'),
('Planes gastronómicos', 'Restaurantes y experiencias culinarias', 'https://cdn.example.com/icons/gastronomia.png'),
('Planes con acción', 'Actividades con movimiento', 'https://cdn.example.com/icons/accion.png'),
('Planes culturales', 'Arte, música y espectáculos', 'https://cdn.example.com/icons/cultural.png');

-- Subcategorías de 'Salir de fiesta' (parent_id = 1)
INSERT IGNORE INTO categorias (nombre_categoria, descripcion, icono, parent_id) VALUES
('Comercial', 'Música comercial y mainstream', 'https://cdn.example.com/icons/comercial.png', 1),
('Techno', 'Música techno y electrónica underground', 'https://cdn.example.com/icons/techno.png', 1),
('Reggaetón', 'Música urbana y reggaetón', 'https://cdn.example.com/icons/reggaeton.png', 1);

-- Subcategorías de 'Tomar algo' (parent_id = 2)
INSERT IGNORE INTO categorias (nombre_categoria, descripcion, icono, parent_id) VALUES
('Rooftops', 'Bares en azoteas', 'https://cdn.example.com/icons/rooftop.png', 2),
('Pubs', 'Pubs y bares clásicos', 'https://cdn.example.com/icons/pubs.png', 2),
('Bares ocultos', 'Bares escondidos y secretos', 'https://cdn.example.com/icons/ocultos.png', 2);

-- Subcategorías de 'Planes gastronómicos' (parent_id = 3)
INSERT IGNORE INTO categorias (nombre_categoria, descripcion, icono, parent_id) VALUES
('Romántico', 'Cenas íntimas y con ambiente', 'https://cdn.example.com/icons/romantico.png', 3),
('Tradicional', 'Comida típica y local', 'https://cdn.example.com/icons/tradicional.png', 3),
('Alternativo', 'Gastronomía original y moderna', 'https://cdn.example.com/icons/alternativo.png', 3),
('Con espectáculo', 'Cenas con shows y animación', 'https://cdn.example.com/icons/show.png', 3),
('Estético', 'Lugares con diseño y estética llamativa', 'https://cdn.example.com/icons/estetico.png', 3);

-- Subcategorías de 'Planes con acción' (parent_id = 4)
INSERT IGNORE INTO categorias (nombre_categoria, descripcion, icono, parent_id) VALUES
('Karting nocturno', 'Carreras de karts por la noche', 'https://cdn.example.com/icons/karting.png', 4),
('Golf nocturno', 'Golf en escenarios iluminados', 'https://cdn.example.com/icons/golf.png', 4),
('Bolera', 'Bolos con amigos', 'https://cdn.example.com/icons/bolos.png', 4),
('Recreativo', 'Arcades y juegos interactivos', 'https://cdn.example.com/icons/recreativo.png', 4);

-- Subcategorías de 'Planes culturales' (parent_id = 5)
INSERT IGNORE INTO categorias (nombre_categoria, descripcion, icono, parent_id) VALUES
('Música en vivo', 'Conciertos y bandas en directo', 'https://cdn.example.com/icons/musica.png', 5),
('Teatro', 'Obras, comedia y monólogos', 'https://cdn.example.com/icons/teatro.png', 5),
('Arte', 'Museos, exposiciones y galerías', 'https://cdn.example.com/icons/arte.png', 5);


-- Crear la tabla 'lugares' si no existe
CREATE TABLE IF NOT EXISTS lugares (
    id_lugar INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_categoria INT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    url_imagen VARCHAR(255),
    precio DECIMAL(6,2),
    valoracion DECIMAL(2,1) DEFAULT 0.0,
    edad_minima INT DEFAULT 18,
    edad_maxima INT DEFAULT 65,
    nivel_formalidad ENUM('informal', 'formal') DEFAULT 'informal',
    ambiente ENUM('tranquilo', 'vibrante') DEFAULT 'tranquilo',
    tamano_grupo ENUM('solo', 'pareja', 'grupo') DEFAULT 'grupo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL
);

-- Insertar lugares de prueba si no existen
INSERT IGNORE INTO lugares (
    id_cliente, id_categoria, nombre, descripcion, direccion, ciudad,
    url_imagen, precio, valoracion, edad_minima, edad_maxima,
    nivel_formalidad, ambiente, tamano_grupo
)
VALUES 
    (1, 1, 'Eclipse Rooftop', 'Azotea con vistas panorámicas de Madrid', 'Calle Atocha 45', 'Madrid',
     'lugares/eclipse.png', 18.50, 4.7, 21, 35, 'informal', 'vibrante', 'grupo'),
     
    (2, 2, 'Vortex Pub', 'Pub urbano con música en vivo', 'Gran Vía 89', 'Madrid',
     'lugares/vortex.png', 12.00, 4.3, 18, 45, 'informal', 'vibrante', 'pareja'),
     
    (3, 3, 'Neon Hidden Bar', 'Bar oculto con cócteles de autor', 'Calle Secreta 12', 'Barcelona',
     'lugares/neon.png', 15.00, 4.8, 25, 50, 'formal', 'tranquilo', 'pareja');

-- Crear la tabla 'eventos' si no existe
CREATE TABLE IF NOT EXISTS eventos (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    id_lugar INT NOT NULL,
    nombre_evento VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_evento DATE NOT NULL,
    precio_entrada DECIMAL(6,2),
    tipo_musica VARCHAR(100),
    dress_code VARCHAR(100),
    imagen_evento VARCHAR(255),
    edad_minima INT DEFAULT 18,
    edad_maxima INT DEFAULT 65,
    nivel_formalidad ENUM('informal', 'formal') DEFAULT 'informal',
    ambiente ENUM('tranquilo', 'vibrante') DEFAULT 'vibrante',
    tamano_grupo ENUM('solo', 'pareja', 'grupo') DEFAULT 'grupo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_lugar) REFERENCES lugares(id_lugar) ON DELETE CASCADE
);

-- Insertar eventos de prueba si no existen
INSERT IGNORE INTO eventos (
    id_lugar, nombre_evento, descripcion, fecha_evento, precio_entrada,
    tipo_musica, dress_code, imagen_evento,
    edad_minima, edad_maxima, nivel_formalidad, ambiente, tamano_grupo
)
VALUES 
    (1, 'Atardecer Electrónico', 'Música electrónica en la azotea con DJ local', '2025-06-20',
     20.00, 'Electrónica', 'Elegante', 'eventos/evento1.png',
     21, 40, 'formal', 'vibrante', 'grupo'),
     
    (2, 'Noche Indie', 'Concierto de bandas emergentes', '2025-07-15',
     15.00, 'Indie Rock', 'Casual', 'eventos/evento2.png',
     18, 35, 'informal', 'tranquilo', 'grupo'),
     
    (3, 'Cocktail Secrets', 'Descubre cócteles ocultos', '2025-08-10',
     10.00, 'Chill', 'Casual', 'eventos/evento3.png',
     25, 50, 'formal', 'tranquilo', 'pareja');

-- Crear la tabla 'favoritos_lugares' si no existe
CREATE TABLE IF NOT EXISTS favoritos_lugares (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_lugar INT NOT NULL,
    fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_usuario, id_lugar),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_lugar) REFERENCES lugares(id_lugar) ON DELETE CASCADE
);

-- Insertar favoritos de prueba
INSERT IGNORE INTO favoritos_lugares (id_usuario, id_lugar)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);


-- Crear la tabla 'reservas_eventos' si no existe
CREATE TABLE IF NOT EXISTS reservas_eventos (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_evento INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad INT DEFAULT 1,
    estado VARCHAR(50) DEFAULT 'confirmada',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE
);

INSERT INTO reservas_eventos (id_usuario, id_evento, cantidad)
VALUES
    (1, 1, 2),
    (2, 2, 1),
    (3, 3, 3);
