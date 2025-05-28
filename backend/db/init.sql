-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS nightly CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nightly;

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO usuarios (nombre, email, password_hash, fecha_nacimiento, avatar_url)
VALUES 
('Juan Pérez', 'juan@dominio.com', '$2a$10$hashdeprueba1', '1995-04-20', 'avatars/user_1.png'), -- contraseña: prueba123
    ('Carlos García', 'carlos@dominio.com', '$2a$10$hashdeprueba2', '1998-06-15', 'avatars/user_2.png'), -- contraseña: prueba123
    ('Laura Jiménez', 'laura@dominio.com', '$2a$10$hashdeprueba3', '2000-12-05', 'avatars/user_3.png'); -- contraseña: prueba123

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
    id_categoria INT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    url_imagen VARCHAR(255),
    precio ENUM('bajo', 'medio', 'alto') DEFAULT 'medio',
    valoracion DECIMAL(2,1) DEFAULT 0.0,
    edad_minima INT DEFAULT 18,
    edad_maxima INT DEFAULT 65,
    nivel_formalidad ENUM('informal', 'formal') DEFAULT 'informal',
    ambiente ENUM('tranquilo', 'vibrante') DEFAULT 'tranquilo',
    tamano_grupo ENUM('solo', 'pareja', 'grupo') DEFAULT 'grupo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL
);

-- Insertar lugares de prueba si no existen
INSERT IGNORE INTO lugares (
    id_categoria, nombre, descripcion, direccion, ciudad,
    url_imagen, precio, valoracion, edad_minima, edad_maxima,
    nivel_formalidad, ambiente, tamano_grupo
)
VALUES
(1, 'Teatro Kapital', 'Discoteca icónica de Madrid con siete plantas temáticas.', 'Calle de Atocha, 125', 'Madrid',
 '../images/lugares/kapital.jpg', 'alto', 4.3, 18, 40, 'informal', 'vibrante', 'grupo'),

(1, 'Oh My Club', 'Discoteca moderna con cenas y espectáculos en vivo.', 'Calle de Rosario Pino, 14', 'Madrid',
 '../images/lugares/ohmyclub.jpg', 'alto', 4.5, 21, 45, 'formal', 'vibrante', 'grupo'),

(1, 'Opium Madrid', 'Club elegante con música house y reguetón.', 'Calle de José Abascal, 56', 'Madrid',
 '../images/lugares/opium.jpg', 'alto', 4.4, 21, 40, 'formal', 'vibrante', 'grupo'),

(5, 'Sala Equis', 'Espacio cultural con cine, música y bar.', 'Calle del Duque de Alba, 4', 'Madrid',
 '../images/lugares/equis.jpg', 'bajo', 4.2, 18, 50, 'informal', 'tranquilo', 'pareja'),

(2, 'La Vía Láctea', 'Bar mítico de Malasaña con música en vivo.', 'Calle de Velarde, 18', 'Madrid',
 '../images/lugares/vialactea.jpg', 'bajo', 4.0, 18, 40, 'informal', 'vibrante', 'grupo'),

(3, 'Bodega de la Ardosa', 'Taberna tradicional famosa por su tortilla.', 'Calle de Colón, 13', 'Madrid',
 '../images/lugares/ardosa.jpg', 'bajo', 4.6, 18, 65, 'informal', 'tranquilo', 'pareja'),

(3, 'El Jardín Secreto', 'Bar con terraza escondida y ambiente romántico.', 'Calle de Montera, 37', 'Madrid',
 '../images/lugares/jardinsecreto.jpg', 'medio', 4.5, 18, 50, 'formal', 'tranquilo', 'pareja'),

(3, 'The Irish Rover', 'Pub irlandés con música en vivo y deportes.', 'Avenida de Brasil, 7', 'Madrid',
 '../images/lugares/irishrover.jpg', 'bajo', 4.3, 18, 50, 'informal', 'vibrante', 'grupo'),

(1, 'Fabrik', 'Macrodiscoteca especializada en música electrónica.', 'Avenida de la Industria, 82', 'Humanes de Madrid',
 '../images/lugares/fabrik.png', 'alto', 4.7, 18, 40, 'informal', 'vibrante', 'grupo'),

(1, 'Shoko Madrid', 'Discoteca y restaurante con eventos temáticos.', 'Calle de Toledo, 86', 'Madrid',
 '../images/lugares/shoko.jpg', 'medio', 4.2, 18, 40, 'formal', 'vibrante', 'grupo'),

(1, 'Sala Mon', 'Sala de conciertos y club nocturno.', 'Calle de Hilarión Eslava, 36', 'Madrid',
 '../images/lugares/mon.jpg', 'medio', 4.1, 18, 40, 'informal', 'vibrante', 'grupo'),

(2, 'La Venencia', 'Bar histórico especializado en vinos de Jerez.', 'Calle de Echegaray, 7', 'Madrid',
 '../images/lugares/venencia.jpg', 'bajo', 4.8, 18, 65, 'informal', 'tranquilo', 'pareja'),

(3, 'Azotea del Círculo de Bellas Artes', 'Una de las mejores vistas de Madrid, ideal para tomar algo con estilo.',
 'Calle de Alcalá, 42', 'Madrid', '../images/lugares/azotea_cba.jpg', 'medio', 4.6, 18, 60, 'formal', 'tranquilo', 'pareja'),

(4, 'Bowling Chamartín', 'Bolera clásica para disfrutar con amigos, música y copas.',
 'Calle de Bolivia, 13', 'Madrid', '../images/lugares/bowling.jpg', 'bajo', 4.0, 18, 50, 'informal', 'vibrante', 'grupo'),

(1, 'Medias Puri', 'Discoteca underground con espectáculos sorpresa y ambiente alternativo.',
 'Plaza de Tirso de Molina, 1', 'Madrid', '../images/lugares/mediaspuri.jpg', 'alto', 4.4, 21, 50, 'informal', 'vibrante', 'grupo'),

(5, 'La Neomudéjar', 'Centro de arte contemporáneo en una antigua estación de tren.',
 'Calle de Antonio Nebrija, s/n', 'Madrid', '../images/lugares/neomudejar.jpg', 'bajo', 4.5, 18, 65, 'informal', 'tranquilo', 'solo'),

(3, 'StreetXO', 'Restaurante con cocina fusión radical y ambiente urbano.',
 'Calle de Serrano, 52', 'Madrid', '../images/lugares/streetxo.jpg', 'alto', 4.7, 21, 50, 'informal', 'vibrante', 'pareja'),

(2, '1862 Dry Bar', 'Cócteles clásicos en un bar oculto estilo speakeasy.',
 'Calle del Pez, 27', 'Madrid', '../images/lugares/1862drybar.jpg', 'medio', 4.6, 21, 55, 'formal', 'tranquilo', 'pareja');

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
-- Teatro Kapital (id_lugar: 1)
(1, 'Kapital Gold Nights', 'Noche exclusiva con zona VIP, champán y música house', '2025-07-05',
 40.00, 'House', 'Elegante', 'eventos/kapital_gold.jpg',
 23, 40, 'formal', 'vibrante', 'pareja'),

-- Opium Madrid (id_lugar: 3)
(3, 'White Party', 'Fiesta temática en blanco con música electrónica y show de luces', '2025-08-09',
 30.00, 'Electrónica', 'Blanco total', 'eventos/opium_white.jpg',
 21, 35, 'formal', 'vibrante', 'grupo'),

-- Sala Equis (id_lugar: 4)
(4, 'Cine + Indie Live', 'Proyección de cortos + concierto indie acústico', '2025-06-22',
 8.00, 'Indie', 'Casual', 'eventos/equis_cineindie.jpg',
 18, 40, 'informal', 'tranquilo', 'pareja'),

-- Bodega de la Ardosa (id_lugar: 6)
(6, 'Cerveza y Flamenco', 'Muestra de flamenco en vivo con degustación de cervezas artesanas', '2025-09-14',
 10.00, 'Flamenco', 'Rústico', 'eventos/ardosa_flamenco.jpg',
 30, 60, 'informal', 'tranquilo', 'pareja'),

-- Fabrik (id_lugar: 9)
(9, 'Techno Reload', 'Evento de techno con más de 6 horas de DJs internacionales', '2025-08-03',
 38.00, 'Techno', 'Libre', 'eventos/fabrik_techno.jpg',
 18, 35, 'informal', 'vibrante', 'grupo'),

-- Shôko Madrid (id_lugar: 10)
(10, 'R&B Sunset Vibes', 'R&B moderno con cócteles al aire libre desde el atardecer', '2025-07-10',
 20.00, 'R&B', 'Urbano', 'eventos/shoko_rnb.jpg',
 21, 35, 'formal', 'vibrante', 'pareja'),

-- Sala Mon (id_lugar: 11)
(11, 'Indie Rock Night', 'Noche de bandas indie con cerveza artesanal y ambiente alternativo', '2025-06-15',
 16.00, 'Indie Rock', 'Informal', 'eventos/mon_indierock.jpg',
 20, 40, 'informal', 'vibrante', 'grupo'),

-- La Venencia (id_lugar: 12)
(12, 'Versos y Vinos', 'Recital poético con degustación de vino jerezano', '2025-10-05',
 10.00, 'Instrumental', 'Elegante', 'eventos/venencia_poetas.jpg',
 30, 65, 'formal', 'tranquilo', 'pareja'),

-- Oh My Club (id_lugar: 2)
(2, 'Cena & Show Deluxe', 'Cena gourmet con espectáculo de cabaret y música house', '2025-07-12',
 50.00, 'House', 'Elegante', 'eventos/ohmyclub_dinner.jpg',
 25, 45, 'formal', 'vibrante', 'pareja'),

-- La Vía Láctea (id_lugar: 5)
(5, 'Rock & Roll Revival', 'Clásicos del rock de los 70s y 80s con banda en directo', '2025-06-28',
 12.00, 'Rock', 'Casual', 'eventos/vialactea_rock.jpg',
 18, 40, 'informal', 'vibrante', 'grupo'),

-- El Jardín Secreto (id_lugar: 7)
(7, 'Noches Románticas', 'Velada íntima con jazz en vivo y cócteles especiales', '2025-07-20',
 18.00, 'Jazz', 'Formal', 'eventos/jardin_jazz.jpg',
 21, 50, 'formal', 'tranquilo', 'pareja'),

-- The Irish Rover (id_lugar: 8)
(8, 'Noche Irlandesa', 'Concierto de folk irlandés y degustación de cervezas', '2025-08-01',
 10.00, 'Folk', 'Casual', 'eventos/irish_folk.jpg',
 18, 50, 'informal', 'vibrante', 'grupo'),

-- Azotea del Círculo de Bellas Artes (id_lugar: 13)
(13, 'Sunset Chillout', 'DJ set con ambient chill y vistas panorámicas', '2025-07-25',
 25.00, 'Chillout', 'Elegante', 'eventos/azotea_chill.jpg',
 21, 60, 'formal', 'tranquilo', 'pareja'),

-- Bowling Chamartín (id_lugar: 14)
(14, 'Noche Retro Bowling', 'Torneo de bolos temático años 80 con premios', '2025-06-30',
 8.00, 'Pop 80s', 'Retro', 'eventos/bowling_retro.png',
 18, 50, 'informal', 'vibrante', 'grupo'),

-- Medias Puri (id_lugar: 15)
(15, 'Puri Underground Show', 'Noche con performances alternativas y música electrónica', '2025-08-17',
 35.00, 'Electrónica', 'Libre', 'eventos/puri_show.jpg',
 21, 50, 'informal', 'vibrante', 'grupo'),

-- La Neomudéjar (id_lugar: 16)
(16, 'Arte Sonoro Live', 'Instalación audiovisual y música experimental en directo', '2025-07-18',
 15.00, 'Experimental', 'Creativo', 'eventos/neomudejar_sound.png',
 18, 65, 'informal', 'tranquilo', 'solo'),

-- StreetXO (id_lugar: 17)
(17, 'XO Fusion Party', 'Showcooking con DJ y cócteles de autor', '2025-07-08',
 45.00, 'Fusión electrónica', 'Urbano', 'eventos/streetxo_fusion.png',
 21, 50, 'informal', 'vibrante', 'pareja'),

-- 1862 Dry Bar (id_lugar: 18)
(18, 'Coctelería y Jazz', 'Clase de mixología con música en vivo estilo jazz', '2025-06-27',
 20.00, 'Jazz', 'Formal', 'eventos/1862_jazzmix.jpg',
 21, 55, 'formal', 'tranquilo', 'pareja');

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

-- Insertar favoritos de ejemplo
INSERT IGNORE INTO favoritos_lugares (id_usuario, id_lugar) VALUES
(1, 1),  -- Juan Pérez guarda Teatro Kapital
(1, 4),  -- Juan guarda Sala Equis
(2, 2),  -- Carlos guarda Oh My Club
(2, 3),  -- Carlos guarda Opium Madrid
(2, 9),  -- Carlos guarda Fabrik
(3, 7),  -- Laura guarda El Jardín Secreto
(3, 5),  -- Laura guarda La Vía Láctea
(1, 10); -- Juan también guarda Shoko Madrid


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
(1, 1, 2),   -- Juan y su pareja a Kapital Gold Nights
(2, 2, 1),   -- Carlos va solo a la White Party
(3, 4, 2),   -- Laura y su pareja al Cine + Indie Live
(1, 5, 3),   -- Juan con 2 amigos al Techno Reload en Fabrik
(3, 11, 2),  -- Laura y su pareja a Indie Rock Night en Sala Mon
(2, 8, 4),   -- Carlos y tres amigos a la Noche Irlandesa en The Irish Rover
(1, 6, 2),   -- Juan con su pareja a R&B Sunset Vibes en Shôko Madrid
(2, 13, 2),  -- Carlos y su novia al Sunset Chillout en la Azotea del Círculo
(3, 16, 1);  -- Laura va sola a la experiencia de Arte Sonoro en La Neomudéjar

-- Crear la tabla 'horarios_lugar' si no existe
CREATE TABLE IF NOT EXISTS horarios_lugar (
  id_horario INT AUTO_INCREMENT PRIMARY KEY,
  id_lugar INT NOT NULL,
  dia VARCHAR(20) NOT NULL,
  hora_apertura TIME NOT NULL,
  hora_cierre TIME NOT NULL,
  FOREIGN KEY (id_lugar) REFERENCES lugares(id_lugar) ON DELETE CASCADE,
  UNIQUE (id_lugar, dia)
);

-- Insertar horarios de ejemplo
INSERT IGNORE INTO horarios_lugar (id_lugar, dia, hora_apertura, hora_cierre) VALUES
(1, 'Lunes', '16:00:00', '00:00:00'),
(1, 'Martes', '16:00:00', '00:00:00'),
(1, 'Miércoles', '16:00:00', '00:00:00'),
(1, 'Jueves', '16:00:00', '01:00:00'),
(1, 'Viernes', '18:00:00', '03:00:00'),
(1, 'Sábado', '18:00:00', '03:00:00'),
(1, 'Domingo', '16:00:00', '00:00:00'),

(2, 'Jueves', '20:00:00', '02:00:00'),
(2, 'Viernes', '20:00:00', '03:00:00'),
(2, 'Sábado', '20:00:00', '03:00:00'),

(3, 'Viernes', '19:00:00', '02:00:00'),
(3, 'Sábado', '19:00:00', '02:00:00');
