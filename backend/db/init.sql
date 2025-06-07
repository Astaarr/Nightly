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
('Salir de fiesta', 'Discotecas y fiestas nocturnas', 'fa-solid fa-martini-glass-citrus'),
('Tomar algo', 'Bares, rooftops y pubs', 'fa-solid fa-beer-mug-empty'),
('Planes gastronómicos', 'Restaurantes y experiencias culinarias', 'fa-solid fa-utensils'),
('Planes con acción', 'Actividades con movimiento', 'fa-solid fa-person-running'),
('Planes culturales', 'Arte, música y espectáculos', 'fa-solid fa-masks-theater');

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
    nivel_formalidad ENUM('informal', 'neutro', 'formal') DEFAULT 'neutro',
    ambiente ENUM('familiar', 'romantico', 'tranquilo', 'animado') DEFAULT 'tranquilo',
    tamano_grupo ENUM('individual', 'pareja', 'grupo') DEFAULT 'grupo',
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
 '../images/lugares/kapital.jpg', 'alto', 4.3, 18, 40, 'informal', 'animado', 'grupo'),

(1, 'Oh My Club', 'Discoteca moderna con cenas y espectáculos en vivo.', 'Calle de Rosario Pino, 14', 'Madrid',
 '../images/lugares/ohmyclub.jpg', 'alto', 4.5, 21, 45, 'formal', 'animado', 'grupo'),

(1, 'Opium Madrid', 'Club elegante con música house y reguetón.', 'Calle de José Abascal, 56', 'Madrid',
 '../images/lugares/opium.jpg', 'alto', 4.4, 21, 40, 'formal', 'animado', 'grupo'),

(5, 'Sala Equis', 'Espacio cultural con cine, música y bar.', 'Calle del Duque de Alba, 4', 'Madrid',
 '../images/lugares/equis.jpg', 'bajo', 4.2, 18, 50, 'informal', 'tranquilo', 'pareja'),

(2, 'La Vía Láctea', 'Bar mítico de Malasaña con música en vivo.', 'Calle de Velarde, 18', 'Madrid',
 '../images/lugares/vialactea.jpg', 'bajo', 4.0, 18, 40, 'informal', 'animado', 'grupo'),

(3, 'Bodega de la Ardosa', 'Taberna tradicional famosa por su tortilla.', 'Calle de Colón, 13', 'Madrid',
 '../images/lugares/ardosa.jpg', 'bajo', 4.6, 18, 65, 'informal', 'tranquilo', 'pareja'),

(3, 'El Jardín Secreto', 'Bar con terraza escondida y ambiente romántico.', 'Calle de Montera, 37', 'Madrid',
 '../images/lugares/jardinsecreto.jpg', 'medio', 4.5, 18, 50, 'formal', 'romantico', 'pareja'),

(3, 'The Irish Rover', 'Pub irlandés con música en vivo y deportes.', 'Avenida de Brasil, 7', 'Madrid',
 '../images/lugares/irishrover.jpg', 'bajo', 4.3, 18, 50, 'informal', 'animado', 'grupo'),

(1, 'Fabrik', 'Macrodiscoteca especializada en música electrónica.', 'Avenida de la Industria, 82', 'Humanes de Madrid',
 '../images/lugares/fabrik.png', 'alto', 4.7, 18, 40, 'informal', 'animado', 'grupo'),

(1, 'Shoko Madrid', 'Discoteca y restaurante con eventos temáticos.', 'Calle de Toledo, 86', 'Madrid',
 '../images/lugares/shoko.jpg', 'medio', 4.2, 18, 40, 'formal', 'animado', 'grupo'),

(1, 'Sala Mon', 'Sala de conciertos y club nocturno.', 'Calle de Hilarión Eslava, 36', 'Madrid',
 '../images/lugares/mon.jpg', 'medio', 4.1, 18, 40, 'informal', 'animado', 'grupo'),

(2, 'La Venencia', 'Bar histórico especializado en vinos de Jerez.', 'Calle de Echegaray, 7', 'Madrid',
 '../images/lugares/venencia.jpg', 'bajo', 4.8, 18, 65, 'informal', 'tranquilo', 'pareja'),

(3, 'Azotea del Círculo de Bellas Artes', 'Una de las mejores vistas de Madrid, ideal para tomar algo con estilo.',
 'Calle de Alcalá, 42', 'Madrid', '../images/lugares/azotea_cba.jpg', 'medio', 4.6, 18, 60, 'formal', 'tranquilo', 'pareja'),

(4, 'Bowling Chamartín', 'Bolera clásica para disfrutar con amigos, música y copas.',
 'Calle de Bolivia, 13', 'Madrid', '../images/lugares/bowling.jpg', 'bajo', 4.0, 18, 50, 'informal', 'animado', 'grupo'),

(1, 'Medias Puri', 'Discoteca underground con espectáculos sorpresa y ambiente alternativo.',
 'Plaza de Tirso de Molina, 1', 'Madrid', '../images/lugares/mediaspuri.jpg', 'alto', 4.4, 21, 50, 'informal', 'animado', 'grupo'),

(5, 'La Neomudéjar', 'Centro de arte contemporáneo en una antigua estación de tren.',
 'Calle de Antonio Nebrija, s/n', 'Madrid', '../images/lugares/neomudejar.jpg', 'bajo', 4.5, 18, 65, 'informal', 'tranquilo', 'individual'),

(3, 'StreetXO', 'Restaurante con cocina fusión radical y ambiente urbano.',
 'Calle de Serrano, 52', 'Madrid', '../images/lugares/streetxo.jpg', 'alto', 4.7, 21, 50, 'informal', 'animado', 'pareja'),

(2, '1862 Dry Bar', 'Cócteles clásicos en un bar oculto estilo speakeasy.',
 'Calle del Pez, 27', 'Madrid', '../images/lugares/1862drybar.jpg', 'medio', 4.6, 21, 55, 'formal', 'tranquilo', 'pareja'),
 
-- Subcategoría Comercial (6)
(6, 'Pachá Madrid', 'Club nocturno icónico con música comercial y ambiente exclusivo', 'Calle de Barceló, 11', 'Madrid', '../images/lugares/kapital.jpg', 'alto', 4.4, 21, 40, 'formal', 'animado', 'grupo'),
(6, 'Joy Eslava', 'Discoteca histórica con varios ambientes y música variada', 'Calle del Arenal, 11', 'Madrid', '../images/lugares/ohmyclub.jpg', 'medio', 4.2, 18, 45, 'informal', 'animado', 'grupo'),
(6, 'Barceló Teatro', 'Antiguo teatro convertido en club con música comercial', 'Calle de Barceló, 11', 'Madrid', '../images/lugares/opium.jpg', 'alto', 4.3, 18, 40, 'formal', 'animado', 'grupo'),

-- Subcategoría Techno (7)
(7, 'Mondo Disko', 'Club underground especializado en techno y electrónica', 'Calle de la Palma, 18', 'Madrid', '../images/lugares/fabrik.png', 'medio', 4.5, 18, 35, 'informal', 'animado', 'grupo'),
(7, 'Stardust', 'Club con fiestas temáticas de techno y proyecciones visuales', 'Calle de la Ballesta, 10', 'Madrid', '../images/lugares/mediaspuri.jpg', 'medio', 4.4, 18, 40, 'informal', 'animado', 'grupo'),
(7, 'LAB Club', 'Pequeño club con sonido de calidad y DJs emergentes', 'Calle de la Cabeza, 15', 'Madrid', '../images/lugares/mon.jpg', 'bajo', 4.3, 18, 40, 'informal', 'animado', 'grupo'),

-- Subcategoría Reggaetón (8)
(8, 'Independance Club', 'Club especializado en reggaetón y música urbana', 'Calle de los Reyes, 5', 'Madrid', '../images/lugares/shoko.jpg', 'medio', 4.2, 18, 35, 'informal', 'animado', 'grupo'),
(8, 'Bocanegra', 'Bar-club con música reggaetón y ambiente latino', 'Calle de la Palma, 18', 'Madrid', '../images/lugares/vialactea.jpg', 'bajo', 4.1, 18, 40, 'informal', 'animado', 'grupo'),
(8, 'Sala Maravillas', 'Sala versátil con noches de reggaetón y trap', 'Calle de San Vicente Ferrer, 33', 'Madrid', '../images/lugares/equis.jpg', 'medio', 4.0, 18, 40, 'informal', 'animado', 'grupo'),

-- Subcategoría Rooftops (9)
(9, 'The Principal Madrid', 'Elegante rooftop con vistas a Gran Vía y cócteles creativos', 'Calle del Marqués de Valdeiglesias, 1', 'Madrid', '../images/lugares/azotea_cba.jpg', 'alto', 4.6, 23, 50, 'formal', 'tranquilo', 'pareja'),
(9, 'Picalagartos Sky Bar', 'Rooftop con piscina y ambiente relajado', 'Calle de Gran Vía, 84', 'Madrid', '../images/lugares/jardinsecreto.jpg', 'medio', 4.4, 21, 45, 'formal', 'tranquilo', 'pareja'),
(9, 'Ginkgo Sky Bar', 'Terraza con vistas panorámicas y ambiente sofisticado', 'Calle de Velázquez, 10', 'Madrid', '../images/lugares/ohmyclub.jpg', 'alto', 4.5, 21, 50, 'formal', 'tranquilo', 'pareja'),

-- Subcategoría Pubs (10)
(10, 'The James Joyce', 'Auténtico pub irlandés con amplia selección de cervezas', 'Calle de Alcalá, 59', 'Madrid', '../images/lugares/irishrover.jpg', 'bajo', 4.3, 18, 50, 'informal', 'animado', 'grupo'),
(10, 'Dubliners', 'Pub con música en vivo y ambiente acogedor', 'Calle de Espoz y Mina, 7', 'Madrid', '../images/lugares/irishrover.jpg', 'bajo', 4.2, 18, 50, 'informal', 'animado', 'grupo'),
(10, 'O Connell Street', 'Pub con decoración tradicional irlandesa y buena cerveza', 'Calle de la Montera, 12', 'Madrid', '../images/lugares/irishrover.jpg', 'bajo', 4.1, 18, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Bares ocultos (11)
(11, 'Salmon Guru', 'Cóctelería de autor con decoración retro-futurista', 'Calle de Echegaray, 21', 'Madrid', '../images/lugares/1862drybar.jpg', 'medio', 4.7, 21, 50, 'formal', 'tranquilo', 'pareja'),
(11, '1862 Dry Bar', 'Bar clandestino estilo speakeasy con cócteles clásicos', 'Calle del Pez, 27', 'Madrid', '../images/lugares/1862drybar.jpg', 'medio', 4.6, 21, 55, 'formal', 'tranquilo', 'pareja'),
(11, 'Angelita Madrid', 'Bar de vinos con ambiente íntimo y selección premium', 'Calle de la Reina, 4', 'Madrid', '../images/lugares/venencia.jpg', 'medio', 4.5, 21, 55, 'formal', 'tranquilo', 'pareja'),

-- Subcategoría Romántico (12)
(12, 'Casa Lucio', 'Restaurante clásico famoso por sus huevos rotos y ambiente acogedor', 'Calle de la Cava Baja, 35', 'Madrid', '../images/lugares/ardosa.jpg', 'alto', 4.7, 18, 65, 'formal', 'romantico', 'pareja'),
(12, 'Corral de la Morería', 'Tablao flamenco con cena gourmet y espectáculo íntimo', 'Calle de la Morería, 17', 'Madrid', '../images/lugares/jardinsecreto.jpg', 'alto', 4.8, 18, 65, 'formal', 'romantico', 'pareja'),
(12, 'Ten Con Ten', 'Restaurante chic con cocina contemporánea y ambiente íntimo', 'Calle de Ayala, 6', 'Madrid', '../images/lugares/streetxo.jpg', 'alto', 4.6, 21, 55, 'formal', 'romantico', 'pareja'),

-- Subcategoría Tradicional (13)
(13, 'Casa Botín', 'Restaurante más antiguo del mundo según Guinness, especializado en cochinillo', 'Calle de los Cuchilleros, 17', 'Madrid', '../images/lugares/ardosa.jpg', 'alto', 4.8, 18, 65, 'formal', 'tranquilo', 'pareja'),
(13, 'La Bola Taberna', 'Famosa por su cocido madrileño tradicional', 'Calle de la Bola, 5', 'Madrid', '../images/lugares/ardosa.jpg', 'medio', 4.5, 18, 65, 'neutro', 'tranquilo', 'pareja'),
(13, 'Malacatín', 'Taberna centenaria especializada en cocido madrileño', 'Calle de la Ruda, 5', 'Madrid', '../images/lugares/ardosa.jpg', 'medio', 4.4, 18, 65, 'informal', 'tranquilo', 'pareja'),

-- Subcategoría Alternativo (14)
(14, 'Pez Tortilla', 'Bar moderno con tortillas creativas y ambiente joven', 'Calle del Pez, 36', 'Madrid', '../images/lugares/streetxo.jpg', 'bajo', 4.3, 18, 40, 'informal', 'animado', 'grupo'),
(14, 'La Mucca', 'Restaurante con cocina fusión y decoración industrial', 'Calle del Pez, 21', 'Madrid', '../images/lugares/streetxo.jpg', 'medio', 4.4, 18, 45, 'informal', 'animado', 'grupo'),
(14, 'Tandem', 'Cocina creativa en raciones para compartir', 'Calle del Duque de Sesto, 32', 'Madrid', '../images/lugares/streetxo.jpg', 'medio', 4.5, 18, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Con espectáculo (15)
(15, 'Teatro Kapital Dinner Show', 'Cena con espectáculo en las instalaciones del Teatro Kapital', 'Calle de Atocha, 125', 'Madrid', '../images/lugares/kapital.jpg', 'alto', 4.5, 18, 50, 'formal', 'animado', 'pareja'),
(15, 'Las Carboneras', 'Tablao flamenco con cena y espectáculo tradicional', 'Calle del Conde de Miranda, 1', 'Madrid', '../images/lugares/jardinsecreto.jpg', 'alto', 4.6, 18, 65, 'formal', 'romantico', 'pareja'),
(15, 'El Imperfecto', 'Bar con espectáculos de magia y cócteles creativos', 'Calle de los Relatores, 19', 'Madrid', '../images/lugares/1862drybar.jpg', 'medio', 4.4, 21, 50, 'formal', 'animado', 'pareja'),

-- Subcategoría Estético (16)
(16, 'DiverXO', 'Restaurante 3 estrellas Michelin con experiencia gastronómica inmersiva', 'Calle de Padre Damián, 23', 'Madrid', '../images/lugares/streetxo.jpg', 'alto', 4.9, 21, 65, 'formal', 'romantico', 'pareja'),
(16, 'Ramses', 'Restaurante con decoración faraónica y cocina mediterránea', 'Calle de Serrano, 39', 'Madrid', '../images/lugares/ohmyclub.jpg', 'alto', 4.7, 18, 55, 'formal', 'romantico', 'pareja'),
(16, 'Bibo', 'Restaurante diseñado por Philippe Starck con cocina de Dani García', 'Paseo de la Castellana, 52', 'Madrid', '../images/lugares/ohmyclub.jpg', 'alto', 4.6, 18, 55, 'formal', 'romantico', 'pareja'),

-- Subcategoría Karting nocturno (17)
(17, 'Karting Carlos Sainz', 'Pista de karts profesional con eventos nocturnos', 'Calle del Comercio, 18', 'Madrid', '../images/lugares/bowling.jpg', 'medio', 4.5, 16, 50, 'informal', 'animado', 'grupo'),
(17, 'Madrid Kart', 'Circuito de karts con iluminación nocturna', 'Carretera de Andalucía, km 12', 'Madrid', '../images/lugares/bowling.jpg', 'medio', 4.3, 16, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Golf nocturno (18)
(18, 'Golf Park', 'Campo de golf con iluminación para jugar de noche', 'Carretera de Burgos, km 14', 'Madrid', '../images/lugares/golf.png', 'alto', 4.4, 18, 65, 'formal', 'tranquilo', 'individual'),

-- Subcategoría Bolera (19)
(19, 'Bowling Chamartín', 'Bolera moderna con bar y música', 'Calle de Bolivia, 13', 'Madrid', '../images/lugares/bowling.jpg', 'bajo', 4.0, 18, 50, 'informal', 'animado', 'grupo'),
(19, 'Boliche', 'Bolera con ambiente retro y cócteles', 'Calle de Alberto Alcocer, 32', 'Madrid', '../images/lugares/bowling.jpg', 'medio', 4.1, 18, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Recreativo (20)
(20, 'Museo del Videojuego', 'Arcade con máquinas retro y modernas', 'Calle de la Luna, 4', 'Madrid', '../images/lugares/recreativo.png', 'bajo', 4.3, 12, 40, 'informal', 'animado', 'grupo'),
(20, 'Neko Bar', 'Bar de gatos con juegos de mesa', 'Calle de la Palma, 18', 'Madrid', '../images/lugares/recreativo.png', 'bajo', 4.5, 18, 40, 'informal', 'tranquilo', 'grupo'),

-- Subcategoría Música en vivo (21)
(21, 'Sala Sol', 'Sala de conciertos emblemática con programación variada', 'Calle de los Jardines, 3', 'Madrid', '../images/lugares/mon.jpg', 'medio', 4.4, 18, 50, 'informal', 'animado', 'grupo'),
(21, 'Costello Club', 'Club de música en vivo y cócteles', 'Calle del Caballero de Gracia, 10', 'Madrid', '../images/lugares/mon.jpg', 'medio', 4.5, 18, 45, 'informal', 'animado', 'grupo'),
(21, 'Clamores', 'Club de jazz con actuaciones en vivo', 'Calle de Alburquerque, 14', 'Madrid', '../images/lugares/mon.jpg', 'medio', 4.6, 18, 60, 'informal', 'tranquilo', 'pareja'),

-- Subcategoría Teatro (22)
(22, 'Teatro Lara', 'Teatro histórico con programación variada', 'Calle de Corredera Baja de San Pablo, 15', 'Madrid', '../images/lugares/neomudejar.jpg', 'medio', 4.5, 12, 65, 'formal', 'tranquilo', 'pareja'),
(22, 'Teatro Kapital Comedy', 'Noches de comedia en el Teatro Kapital', 'Calle de Atocha, 125', 'Madrid', '../images/lugares/kapital.jpg', 'bajo', 4.3, 18, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Arte (23)
(23, 'Museo Reina Sofía', 'Museo de arte contemporáneo con obras de Dalí y Picasso', 'Calle de Santa Isabel, 52', 'Madrid', '../images/lugares/neomudejar.jpg', 'bajo', 4.8, 12, 65, 'formal', 'tranquilo', 'individual'),
(23, 'Matadero Madrid', 'Centro cultural en antigua nave industrial', 'Paseo de la Chopera, 14', 'Madrid', '../images/lugares/neomudejar.jpg', 'bajo', 4.6, 12, 65, 'informal', 'tranquilo', 'individual'),
(23, 'CaixaForum Madrid', 'Centro cultural con exposiciones temporales', 'Paseo del Prado, 36', 'Madrid', '../images/lugares/neomudejar.jpg', 'bajo', 4.5, 12, 65, 'formal', 'tranquilo', 'individual');

-- Crear tabla eventos (mantengo la estructura anterior)
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
    nivel_formalidad ENUM('informal', 'neutro', 'formal') DEFAULT 'neutro',
    ambiente ENUM('familiar', 'romantico', 'tranquilo', 'animado') DEFAULT 'animado',
    tamano_grupo ENUM('individual', 'pareja', 'grupo') DEFAULT 'grupo',
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
 23, 40, 'formal', 'animado', 'pareja'),

-- Opium Madrid (id_lugar: 3)
(3, 'White Party', 'Fiesta temática en blanco con música electrónica y show de luces', '2025-08-09',
 30.00, 'Electrónica', 'Blanco total', 'eventos/opium_white.jpg',
 21, 35, 'formal', 'animado', 'grupo'),

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
 18, 35, 'informal', 'animado', 'grupo'),

-- Shôko Madrid (id_lugar: 10)
(10, 'R&B Sunset Vibes', 'R&B moderno con cócteles al aire libre desde el atardecer', '2025-07-10',
 20.00, 'R&B', 'Urbano', 'eventos/shoko_rnb.jpg',
 21, 35, 'formal', 'animado', 'pareja'),

-- Sala Mon (id_lugar: 11)
(11, 'Indie Rock Night', 'Noche de bandas indie con cerveza artesanal y ambiente alternativo', '2025-06-15',
 16.00, 'Indie Rock', 'Informal', 'eventos/mon_indierock.jpg',
 20, 40, 'informal', 'animado', 'grupo'),

-- La Venencia (id_lugar: 12)
(12, 'Versos y Vinos', 'Recital poético con degustación de vino jerezano', '2025-10-05',
 10.00, 'Instrumental', 'Elegante', 'eventos/venencia_poetas.jpg',
 30, 65, 'formal', 'tranquilo', 'pareja'),

-- Oh My Club (id_lugar: 2)
(2, 'Cena & Show Deluxe', 'Cena gourmet con espectáculo de cabaret y música house', '2025-07-12',
 50.00, 'House', 'Elegante', 'eventos/ohmyclub_dinner.jpg',
 25, 45, 'formal', 'animado', 'pareja'),

-- La Vía Láctea (id_lugar: 5)
(5, 'Rock & Roll Revival', 'Clásicos del rock de los 70s y 80s con banda en directo', '2025-06-28',
 12.00, 'Rock', 'Casual', 'eventos/vialactea_rock.jpg',
 18, 40, 'informal', 'animado', 'grupo');

-- Crear otras tablas (favoritos, reservas, horarios)
CREATE TABLE IF NOT EXISTS favoritos_lugares (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_lugar INT NOT NULL,
    fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_usuario, id_lugar),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_lugar) REFERENCES lugares(id_lugar) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservas_eventos (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_evento INT NOT NULL,
    usuario_reserva VARCHAR(100) NOT NULL,
    email_reserva VARCHAR(100) NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cantidad INT DEFAULT 1,
    estado VARCHAR(50) DEFAULT 'confirmada',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS horarios_lugar (
  id_horario INT AUTO_INCREMENT PRIMARY KEY,
  id_lugar INT NOT NULL,
  dia VARCHAR(20) NOT NULL,
  hora_apertura TIME NOT NULL,
  hora_cierre TIME NOT NULL,
  FOREIGN KEY (id_lugar) REFERENCES lugares(id_lugar) ON DELETE CASCADE,
  UNIQUE (id_lugar, dia)
);
