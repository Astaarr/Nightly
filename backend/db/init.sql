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
('Marta Fernández', 'marta.fernandez@gmail.com', '$2a$12$vcXYAj5Wy/tt/mouKa.c4eQ6SZX6ejm6zsUTvpd2Wad3/c493kwIu', '1992-07-11', 'avatars/marta.png'), -- contraseña: Marta123
('Andrés López', 'andres.lopez@hotmail.com', '$2a$12$SNx4tRnBODaG/lY0SdIDj.EOPrUfv8DTEPcb2FzO/SdDhgrn1IoMy', '1987-02-28', 'avatars/andres.png'), -- contraseña: Andres456
('Claudia Romero', 'claudia.romero@yahoo.com', '$2a$12$7oYjXgo6cpzz9z9TkbiPmO3QqpHarQE/URwKwaJ8E.kKN6kSoAFbW', '1999-11-30', 'avatars/claudia.png'), -- contraseña: Claudia789
('Yohana Manteca', 'yohanamanteca@gmail.com', '$2a$12$kN7TZlH5rGQXvGJWigp6j.SOm6hohssZEC4Sr5xRUSStkS2lBbvWy', '2005-03-06', 'avatars/yohana.png'), -- contraseña: yohana1234
('Adrián Arcones', 'adrianarconesgomez@gmail.com', '$2a$12$cIHIwxV/ZI75k37EDiF7Sev5GhaKjQlsHT2QHYRHze7pFSko4FJ8y', '2005-03-18', 'avatars/adrian.png'); -- contraseña: Adri0987

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
-- Subcategoría Comercial (6)
(6, 'Pachá Madrid', 'Club nocturno icónico con música comercial y ambiente exclusivo', 'Calle de Barceló, 11', 'Madrid', '../images/lugares/pacha.jpg', 'alto', 4.4, 21, 40, 'formal', 'tranquilo', 'grupo'),
(6, 'Joy Eslava', 'Discoteca histórica con varios ambientes y música variada', 'Calle del Arenal, 11', 'Madrid', '../images/lugares/joyeslava.jpg', 'medio', 4.2, 18, 45, 'informal', 'animado', 'grupo'),
(6, 'Barceló Teatro', 'Antiguo teatro convertido en club con música comercial', 'Calle de Barceló, 11', 'Madrid', '../images/lugares/barcelo.jpg', 'alto', 4.3, 18, 40, 'formal', 'animado', 'grupo'),
(6, 'Arena Madrid', 'Club comercial con DJ internacionales y espectáculo de luces.', 'Calle de Principes de Vergara, 30', 'Madrid', '../images/lugares/arena.jpg', 'alto', 4.3, 21, 45, 'formal', 'animado', 'grupo'),
(6, 'Blondie Madrid', 'Sala y club con sesiones comerciales y fiestas temáticas.', 'Calle de Barceló, 11', 'Madrid', '../images/lugares/blondie.jpg', 'medio', 4.1, 18, 40, 'informal', 'animado', 'grupo'),
(6, 'Teatro Kapital', 'Discoteca icónica de Madrid con varias plantas y diferentes estilos musicales.', 'Calle de Atocha, 125', 'Madrid', '../images/lugares/kapital.jpg', 'alto', 4.3, 18, 40, 'informal', 'animado', 'grupo'),

-- Subcategoría Techno (7)
(7, 'Mondo Disko', 'Club underground especializado en techno y electrónica', 'Calle de la Palma, 18', 'Madrid', '../images/lugares/mondodisko.jpg', 'medio', 4.5, 18, 35, 'informal', 'animado', 'grupo'),
(7, 'Stardust', 'Club con fiestas temáticas de techno y proyecciones visuales', 'Calle de la Ballesta, 10', 'Madrid', '../images/lugares/Stardust.jpg', 'medio', 4.4, 18, 40, 'informal', 'animado', 'grupo'),
(7, 'LAB Club', 'Pequeño club con sonido de calidad y DJs emergentes', 'Calle de la Cabeza, 15', 'Madrid', '../images/lugares/LAB.jpg', 'bajo', 4.3, 18, 40, 'informal', 'animado', 'grupo'),
(7, 'El Laberinto Nocturno', 'Bar con decoración misteriosa, música electrónica y espacios secretos.', 'Calle Misterio, 2929', 'Madrid', '../images/lugares/laberintonocturno.png', 'medio', 4.4, 21, 45, 'informal', 'animado', 'grupo'),
(7, 'Sótano 9', 'Un club subterráneo para amantes de la música electrónica, con DJs en directo cada semana.', 'Calle Luna, 202', 'Madrid', '../images/lugares/sotano9.jpg', 'medio', 4.2, 20, 45, 'informal', 'animado', 'grupo'),
(7, 'Club Aurora', 'Club nocturno con iluminación envolvente, DJs residentes y pista amplia para bailar en grupo.', 'Calle Noche, 1414', 'Madrid', '../images/lugares/ClubAurora.jpg', 'medio', 4.2, 20, 40, 'informal', 'animado', 'grupo'),
(7, 'MOB Club', 'Club minimal techno con un sistema de sonido potente.', 'Calle de Torrecilla del Leal, 22', 'Madrid', '../images/lugares/MOB.jpg', 'medio', 4.6, 18, 35, 'informal', 'animado', 'individual'),
(7, 'Barcode', 'Espacio de techno experimental con invitados internacionales.', 'Calle de la Paloma, 10', 'Madrid', '../images/lugares/barcode.jpg', 'medio', 4.4, 18, 40, 'informal', 'animado', 'grupo'),
(7, 'Fabrik', 'Macrodiscoteca especializada en música electrónica y eventos de gran formato.', 'Avenida de la Industria, 82', 'Humanes de Madrid', '../images/lugares/fabrik.png', 'alto', 4.7, 18, 40, 'informal', 'animado', 'grupo'),

-- Subcategoría Reggaetón (8)
(8, 'Independance Club', 'Club especializado en reggaetón y música urbana', 'Calle de los Reyes, 5', 'Madrid', '../images/lugares/Independance.jpg', 'medio', 4.2, 18, 35, 'informal', 'animado', 'grupo'),
(8, 'Bocanegra', 'Bar-club con música reggaetón y ambiente latino', 'Calle de la Palma, 18', 'Madrid', '../images/lugares/Bocanegra.jpg', 'bajo', 4.1, 18, 40, 'informal', 'animado', 'grupo'),
(8, 'Sala Maravillas', 'Sala versátil con noches de reggaetón y trap', 'Calle de San Vicente Ferrer, 33', 'Madrid', '../images/lugares/maravillas.jpg', 'medio', 4.0, 18, 40, 'informal', 'animado', 'individual'),
(8, 'Stereobar', 'Bar-club con noches de reggaetón y sonido latino.', 'Calle de Santa Isabel, 5', 'Madrid', '../images/lugares/stereobar.jpg', 'medio', 4.2, 18, 40, 'informal', 'animado', 'grupo'),
(8, 'La Murga', 'Sala con ambiente de fiesta urbana y reggaetón en directo.', 'Calle de la Luna, 12', 'Madrid', '../images/lugares/murga.jpg', 'medio', 4.0, 18, 40, 'informal', 'animado', 'grupo'),
(8, 'Nebula Club', 'Local de estilo futurista con música enérgica, luces LED y buena pista para bailar solo o conocer gente.', 'Calle de Barceló, 11', 'Madrid', '../images/lugares/NebulaClub.jpg', 'bajo', 4.4, 20, 50, 'informal', 'animado', 'individual'),
(8, 'Cueva Urbana', 'Discoteca en un antiguo refugio subterráneo, con reguetón, luces LED y ambiente animado para salir con amigos.', 'Calle Subterránea, 2121', 'Madrid', '../images/lugares/CuevaUrbana.jpg', 'medio', 4.1, 20, 40, 'informal', 'animado', 'grupo'),
(8, 'Club Eclipse', 'Club con DJ en vivo y barra de cócteles, ambiente dinámico para salir en grupo.', 'Calle Luna, 2525', 'Madrid', '../images/lugares/Eclipse.jpg', 'medio', 4.0, 20, 40, 'informal', 'animado', 'grupo'),
(8, 'Opium Madrid', 'Club elegante con música house y reguetón, ideal para noches de fiesta sofisticadas.', 'Calle de José Abascal, 56', 'Madrid', '../images/lugares/opium.jpg', 'alto', 4.4, 21, 40, 'formal', 'animado', 'grupo'),
(8, 'Shoko Madrid', 'Discoteca y restaurante con eventos temáticos y ambiente cosmopolita.', 'Calle de Toledo, 86', 'Madrid', '../images/lugares/shoko.jpg', 'medio', 4.2, 18, 40, 'formal', 'animado', 'grupo'),

-- Subcategoría Rooftops (9)
(9, 'The Principal Madrid', 'Elegante rooftop con vistas a Gran Vía y cócteles creativos', 'Calle del Marqués de Valdeiglesias, 1', 'Madrid', '../images/lugares/PrincipalMadrid.jpg', 'alto', 4.6, 23, 50, 'formal', 'tranquilo', 'grupo'),
(9, 'Picalagartos Sky Bar', 'Rooftop con piscina y ambiente relajado', 'Calle de Gran Vía, 84', 'Madrid', '../images/lugares/Picalagartos.jpg', 'medio', 4.4, 21, 45, 'formal', 'tranquilo', 'pareja'),
(9, 'Ginkgo Sky Bar', 'Terraza con vistas panorámicas y ambiente sofisticado', 'Calle de Velázquez, 10', 'Madrid', '../images/lugares/Ginkgo.jpg', 'alto', 4.5, 21, 50, 'formal', 'tranquilo', 'pareja'),
(9, 'Sky Bar Hyatt', 'Rooftop elegante en hotel Hyatt con cócteles premium.', 'Paseo de la Castellana, 57', 'Madrid', '../images/lugares/Hyatt.jpg', 'alto', 4.7, 21, 60, 'formal', 'tranquilo', 'pareja'),
(9, 'El Templo Lounge', 'Lounge elegante con servicio de cócteles premium y sofás amplios, ideal para reuniones formales o relajadas.', 'Calle de Serrano, 41', 'Madrid', '../images/lugares/templolounge.jpg', 'alto', 4.6, 23, 55, 'formal', 'tranquilo', 'grupo'),
(9, 'Terraza Boreal', 'Terraza elevada con vistas a la ciudad, decoración elegante y ambiente tranquilo para escapadas en pareja.', 'Calle de Segovia, 21', 'Madrid', '../images/lugares/TerrazaBoreal.jpg', 'medio', 4.1, 18, 48, 'formal', 'tranquilo', 'pareja'),
(9, 'Ático Z', 'Un bar elegante con vistas espectaculares al atardecer, ideal para una cita en pareja.', 'Calle del Sol, 101', 'Madrid', '../images/lugares/aticoZ.jpg', 'alto', 4.7, 25, 50, 'formal', 'romantico', 'pareja'),
(9, 'Mirador 360', 'Cocteles en lo alto de Madrid, con vistas panorámicas y ambiente elegante para parejas.', 'Calle Viento, 404', 'Madrid', '../images/lugares/Mirador360.jpg', 'medio', 4.6, 21, 55, 'formal', 'romantico', 'pareja'),
(9, 'Torreon Lounge', 'Coctelería ubicada en una torre antigua con vistas de 360º, perfecta para grupos sofisticados.', 'Calle Torre, 909', 'Madrid', '../images/lugares/TorreonLounge.jpg', 'medio', 4.6, 23, 58, 'formal', 'romantico', 'grupo'),
(9, 'Skyline Lounge', 'Bar con terraza, cócteles exclusivos y vistas espectaculares, ideal para una cita formal.', 'Calle Altura, 2828', 'Madrid', '../images/lugares/SkylineLounge.jpg', 'alto', 4.9, 24, 50, 'formal', 'romantico', 'pareja'),
(9, 'Jardines de Medianoche', 'Terraza con música chill-out, luces suaves y vegetación ideal para citas tranquilas al aire libre.', 'Calle Palmeras, 2020', 'Madrid', '../images/lugares/JardinesMedianoche.jpg', 'medio', 4.5, 20, 50, 'informal', 'tranquilo', 'pareja'),
(9, 'Azotea del Círculo de Bellas Artes', 'Una de las mejores vistas de Madrid, ideal para tomar algo con estilo y relax.', 'Calle de Alcalá, 42', 'Madrid', '../images/lugares/azotea_cba.jpg', 'medio', 4.6, 18, 60, 'formal', 'tranquilo', 'individual'),

-- Subcategoría Pubs (10)
(10, 'The James Joyce', 'Auténtico pub irlandés con amplia selección de cervezas', 'Calle de Alcalá, 59', 'Madrid', '../images/lugares/JamesJoyce.jpg', 'bajo', 4.3, 18, 50, 'informal', 'animado', 'grupo'),
(10, 'Dubliners', 'Pub con música en vivo y ambiente acogedor', 'Calle de Espoz y Mina, 7', 'Madrid', '../images/lugares/Dubliners.jpg', 'bajo', 4.2, 18, 50, 'informal', 'tranquilo', 'individual'),
(10, 'O Connell Street', 'Pub con decoración tradicional irlandesa y buena cerveza', 'Calle de la Montera, 12', 'Madrid', '../images/lugares/OConnellStreet.jpg', 'bajo', 4.1, 18, 50, 'informal', 'animado', 'grupo'),
(10, 'O’Learys Gran Vía', 'Pub deportivo con pantallas y ambiente animado.', 'Gran Vía, 15', 'Madrid', '../images/lugares/O’LearysGranVía.jpg', 'medio', 4.0, 18, 50, 'informal', 'animado', 'grupo'),
(10, 'Belushi’s Madrid', 'Pub internacional con música y comida americana.', 'Calle del Pez, 20', 'Madrid', '../images/lugares/Belushi’sMadrid.jpeg', 'medio', 4.1, 18, 50, 'informal', 'animado', 'grupo'),
(10, 'Garage Beat', 'Discoteca con estética industrial, ideal para grupos jóvenes que buscan fiesta sin etiquetas.', 'Calle Acero, 505', 'Madrid', '../images/lugares/GarageBeat.jpg', 'bajo', 4.0, 19, 40, 'informal', 'animado', 'grupo'),
(10, 'Noctámbulo', 'Pub para los más nocturnos, con buena música, barra larga y ambiente distendido para solteros.', 'Calle Oscura, 808', 'Madrid', '../images/lugares/Noctámbulo.jpg', 'bajo', 4.1, 20, 45, 'informal', 'animado', 'individual'),
(10, 'The Irish Rover', 'Pub irlandés con música en vivo, deportes y cervezas internacionales.', 'Avenida de Brasil, 7', 'Madrid', '../images/lugares/irishrover.jpg', 'bajo', 4.3, 18, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Bares ocultos (11)
(11, 'Salmon Guru', 'Cóctelería de autor con decoración retro-futurista', 'Calle de Echegaray, 21', 'Madrid', '../images/lugares/SalmonGuru.jpg', 'medio', 4.7, 21, 50, 'formal', 'tranquilo', 'pareja'),
(11, '1862 Dry Bar', 'Bar clandestino estilo speakeasy con cócteles clásicos', 'Calle del Pez, 27', 'Madrid', '../images/lugares/1862drybar.jpg', 'medio', 4.6, 21, 55, 'formal', 'tranquilo', 'individual'),
(11, 'Angelita Madrid', 'Bar de vinos con ambiente íntimo y selección premium', 'Calle de la Reina, 4', 'Madrid', '../images/lugares/AngelitaMadrid.jpg', 'medio', 4.5, 21, 55, 'formal', 'tranquilo', 'pareja'),
(11, 'El Doble', 'Speakeasy gourmet con cócteles de autor.', 'Calle de la Libertad, 10', 'Madrid', '../images/lugares/ElDoble.jpeg', 'alto', 4.6, 21, 55, 'formal', 'tranquilo', 'pareja'),
(11, 'Bar &Co', 'Bar secreto escondido tras una puerta giratoria.', 'Calle del Barquillo, 45', 'Madrid', '../images/lugares/Bar&Co.jpg', 'medio', 4.5, 21, 55, 'formal', 'animado', 'pareja'),
(11, 'Distrito 22', 'Espacio urbano y minimalista con buena música chill y opciones económicas, pensado para citas tranquilas.', 'Calle de Fuencarral, 92', 'Madrid', '../images/lugares/Distrito22.jpg', 'bajo', 4.2, 18, 40, 'informal', 'tranquilo', 'pareja'),
(11, 'Jardín Escondido', 'Bar escondido en un jardín interior, con ambiente íntimo y naturaleza alrededor.', 'Calle Flor, 707', 'Madrid', '../images/lugares/JardinEscondido.jpg', 'medio', 4.3, 18, 50, 'informal', 'tranquilo', 'grupo'),
(11, 'Laberinto', 'Bar con salas escondidas, juegos de luces y espacios secretos que sorprenden en cada esquina.', 'Calle Laberinto, 1818', 'Madrid', '../images/lugares/Laberinto.jpg', 'medio', 4.3, 21, 45, 'informal', 'animado', 'grupo'),

-- Subcategoría Romántico (12)
(12, 'Casa Lucio', 'Restaurante clásico famoso por sus huevos rotos y ambiente acogedor', 'Calle de la Cava Baja, 35', 'Madrid', '../images/lugares/CasaLucio.jpg', 'alto', 4.7, 18, 65, 'formal', 'romantico', 'pareja'),
(12, 'Corral de la Morería', 'Tablao flamenco con cena gourmet y espectáculo íntimo', 'Calle de la Morería, 17', 'Madrid', '../images/lugares/CorralMoreria.jpg', 'alto', 4.8, 18, 65, 'formal', 'romantico', 'pareja'),
(12, 'Ten Con Ten', 'Restaurante chic con cocina contemporánea y ambiente íntimo', 'Calle de Ayala, 6', 'Madrid', '../images/lugares/TenConTen.jpg', 'alto', 4.6, 21, 55, 'formal', 'romantico', 'pareja'),
(12, 'El Jardín del Ángel', 'Restaurante con microjardines interiores y velas.', 'Calle del Ángel, 1', 'Madrid', '../images/lugares/Jardinangel.jpg', 'alto', 4.7, 18, 65, 'formal', 'romantico', 'pareja'),
(12, 'Mirador del Palacio', 'Cena con vistas al Palacio Real y ambiente íntimo.', 'Calle Bailén, s/n', 'Madrid', '../images/lugares/MiradorPalacio.jpg', 'alto', 4.8, 18, 65, 'formal', 'romantico', 'pareja'),
(12, 'Refugio 66', 'Un rincón acogedor ideal para desconectar en pareja, con decoración retro y luces cálidas.', 'Calle del Espíritu Santo, 23', 'Madrid', '../images/lugares/Refugio66.jpeg', 'medio', 4.5, 19, 47, 'informal', 'tranquilo', 'pareja'),
(12, 'Cueva Medieval', 'Espacio moderno bajo tierra con ambiente selecto, ideal para grupos que buscan experiencias exclusivas.', 'Calle de Jorge Juan, 20', 'Madrid', '../images/lugares/CuevaMedieval.jpg', 'alto', 4.8, 22, 58, 'formal', 'romantico', 'grupo'),
(12, 'Eclipse Bar', 'Bar con temática lunar, ideal para una cita tranquila en pareja con ambiente sofisticado.', 'Calle Eclipse, 1111', 'Madrid', '../images/lugares/EclipseBar.jpg', 'medio', 4.5, 21, 55, 'formal', 'tranquilo', 'pareja'),
(12, 'El Jardín Secreto', 'Bar con terraza escondida y ambiente romántico para una noche mágica en pareja.', 'Calle de Montera, 37', 'Madrid', '../images/lugares/jardinsecreto.jpg', 'medio', 4.5, 18, 50, 'formal', 'romantico', 'pareja'),

-- Subcategoría Tradicional (13)
(13, 'Casa Botín', 'Restaurante más antiguo del mundo según Guinness, especializado en cochinillo', 'Calle de los Cuchilleros, 17', 'Madrid', '../images/lugares/CasaBotin.jpg', 'alto', 4.8, 18, 65, 'formal', 'tranquilo', 'pareja'),
(13, 'La Bola Taberna', 'Famosa por su cocido madrileño tradicional', 'Calle de la Bola, 5', 'Madrid', '../images/lugares/BolaTaberna.jpg', 'medio', 4.5, 18, 65, 'neutro', 'tranquilo', 'pareja'),
(13, 'Malacatín', 'Taberna centenaria especializada en cocido madrileño', 'Calle de la Ruda, 5', 'Madrid', '../images/lugares/Malacatin.jpg', 'medio', 4.4, 18, 65, 'informal', 'tranquilo', 'grupo'),
(13, 'Taberna La Daniela', 'Especialidad en torreznos y platos castellanos.', 'Calle de Fernando VI, 23', 'Madrid', '../images/lugares/TabernaDaniela.jpg', 'medio', 4.4, 18, 65, 'neutro', 'tranquilo', 'pareja'),
(13, 'Los Caracoles', 'Taberna de toda la vida con recetas tradicionales.', 'Calle de la Corredera, 18', 'Madrid', '../images/lugares/caracoles.jpg', 'medio', 4.3, 18, 65, 'informal', 'tranquilo', 'pareja'),
(13, 'Café Astral', 'Café ambientado en astrología y constelaciones, perfecto para disfrutar de un café solo y relajarse.', 'Calle Estrella, 1212', 'Madrid', '../images/lugares/astral.jpg', 'bajo', 4.3, 18, 60, 'informal', 'tranquilo', 'individual'),
(13, 'Brasa & Brillo', 'Restaurante elegante especializado en carnes a la brasa, perfecto para cenas románticas con estilo tradicional.', 'Calle Carbón, 1313', 'Madrid', '../images/lugares/BrasaBrillo.jpg', 'alto', 4.7, 25, 60, 'formal', 'romantico', 'pareja'),
(13, 'Café Duna', 'Un rincón tranquilo con café de autor, decoración acogedora y libros para desconectar.', 'Calle Arena, 303', 'Madrid', '../images/lugares/CafeDuna.jpg', 'bajo', 4.5, 18, 65, 'informal', 'tranquilo', 'individual'),
(13, 'Bibliobar', 'Bar silencioso con libros y jazz en vinilo, ideal para disfrutar de una noche tranquila y reflexiva.', 'Calle Silencio, 1616', 'Madrid', '../images/lugares/Bibliobar.jpg', 'bajo', 4.6, 22, 65, 'informal', 'tranquilo', 'individual'),
(13, 'La Caverna Literaria', 'Café con libros y ambiente vintage, perfecto para leer y relajarse en soledad.', 'Calle Letras, 2323', 'Madrid', '../images/lugares/CavernaLiteraria.jpeg', 'bajo', 4.2, 18, 65, 'informal', 'tranquilo', 'individual'),
(13, 'El Fogón de Oro', 'Restaurante de comida tradicional con toque gourmet y ambiente romántico.', 'Calle Tradición, 2424', 'Madrid', '../images/lugares/FogonOro.jpg', 'medio', 4.7, 25, 60, 'formal', 'romantico', 'pareja'),
(13, 'Jazz & Libros', 'Bar tranquilo con música jazz suave y biblioteca, pensado para una velada introspectiva.', 'Calle Jazz, 2727', 'Madrid', '../images/lugares/JazzLibros.jpg', 'bajo', 4.8, 22, 65, 'informal', 'tranquilo', 'individual'),
(13, 'Bodega de la Ardosa', 'Taberna tradicional famosa por su tortilla y cañas bien tiradas.', 'Calle de Colón, 13', 'Madrid', '../images/lugares/ardosa.jpg', 'bajo', 4.6, 18, 65, 'informal', 'tranquilo', 'grupo'),
(13, 'La Venencia', 'Bar histórico especializado en vinos de Jerez. Ambiente sobrio y clásico.', 'Calle de Echegaray, 7', 'Madrid', '../images/lugares/venencia.jpg', 'bajo', 4.8, 18, 65, 'informal', 'tranquilo', 'pareja'),
(13, 'Sala Equis', 'Espacio cultural con cine, música y bar, ideal para una experiencia diferente en pareja.', 'Calle del Duque de Alba, 4', 'Madrid', '../images/lugares/equis.jpg', 'bajo', 4.2, 18, 50, 'informal', 'tranquilo', 'pareja'),

-- Subcategoría Alternativo (14)
(14, 'Pez Tortilla', 'Bar moderno con tortillas creativas y ambiente joven', 'Calle del Pez, 36', 'Madrid', '../images/lugares/PezTortilla.jpg', 'bajo', 4.3, 18, 40, 'informal', 'animado', 'individual'),
(14, 'La Mucca', 'Restaurante con cocina fusión y decoración industrial', 'Calle del Pez, 21', 'Madrid', '../images/lugares/Mucca.jpg', 'medio', 4.4, 18, 45, 'informal', 'animado', 'grupo'),
(14, 'Tandem', 'Cocina creativa en raciones para compartir', 'Calle del Duque de Sesto, 32', 'Madrid', '../images/lugares/Tandem.jpg', 'medio', 4.5, 18, 50, 'informal', 'animado', 'grupo'),
(14, 'El Huerto de Lucas', 'Eco-market & veggie con decoración sostenible.', 'Calle de San Lucas, 13', 'Madrid', '../images/lugares/huertodelucas.jpg', 'bajo', 4.5, 18, 50, 'informal', 'tranquilo', 'grupo'),
(14, 'Platea Madrid', 'Espacio gastronómico innovador y diseño multicultural.', 'Calle de Goya, 5', 'Madrid', '../images/lugares/Platea.jpg', 'medio', 4.6, 18, 55, 'informal', 'animado', 'grupo'),
(14, 'Estación Central', 'Bar ambientado como una antigua estación de tren, con detalles retro y ambiente informal y dinámico.', 'Calle Raíl, 1919', 'Madrid', '../images/lugares/EstacionCentral.jpg', 'medio', 4.4, 19, 55, 'informal', 'animado', 'individual'),
(14, 'Rincón Salvaje', 'Bar alternativo con grafitis, luces tenues y ambiente relajado para parejas que buscan algo distinto.', 'Calle de Embajadores, 52', 'Madrid', '../images/lugares/RinconSalvaje.jpg', 'bajo', 4.3, 21, 65, 'informal', 'animado', 'pareja'),
(14, 'Zona Cero', 'Bar con ambientación post-apocalíptica, luces de neón y música alternativa para grupos jóvenes.', 'Calle Ceniza, 1010', 'Madrid', '../images/lugares/ZonaCero.jpg', 'bajo', 4.4, 19, 40, 'informal', 'animado', 'grupo'),
(14, 'Estación Vintage', 'Bar temático con trenes y estilo retro, ambiente divertido y diferente para grupos.', 'Calle Vía, 3030', 'Madrid', '../images/lugares/EstacionVintage.jpg', 'medio', 4.3, 19, 55, 'informal', 'animado', 'grupo'),
(14, 'Medias Puri', 'Discoteca underground con espectáculos sorpresa y estética alternativa.', 'Plaza de Tirso de Molina, 1', 'Madrid', '../images/lugares/mediaspuri.jpg', 'alto', 4.4, 21, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Con espectáculo (15)
(15, 'Teatro Kapital Dinner Show', 'Cena con espectáculo en las instalaciones del Teatro Kapital', 'Calle de Atocha, 125', 'Madrid', '../images/lugares/TeatroKapitalDinnerShow.jpg', 'alto', 4.5, 18, 50, 'formal', 'animado', 'pareja'),
(15, 'Las Carboneras', 'Tablao flamenco con cena y espectáculo tradicional', 'Calle del Conde de Miranda, 1', 'Madrid', '../images/lugares/LasCarboneras.jpg', 'alto', 4.6, 18, 65, 'formal', 'romantico', 'pareja'),
(15, 'El Imperfecto', 'Bar con espectáculos de magia y cócteles creativos', 'Calle de los Relatores, 19', 'Madrid', '../images/lugares/ElImperfecto.png', 'medio', 4.4, 21, 50, 'formal', 'animado', 'pareja'),
(15, 'Taberna Flamenca Las Tablas', 'Cena con espectáculo flamenco íntimo.', 'Calle de Corazón de María, 42', 'Madrid', '../images/lugares/LasTablas.jpg', 'alto', 4.7, 18, 65, 'formal', 'romantico', 'pareja'),
(15, 'Fábrica Moritz', 'Cena-show con teatro interactivo y coctelería.', 'Calle de Pez, 21', 'Madrid', '../images/lugares/FabricaMoritz.jpg', 'medio', 4.4, 18, 55, 'formal', 'animado', 'grupo'),
(15, 'Teatro & Tapas', 'Bar con espectáculos en vivo, comedia y tapas españolas para compartir entre amigos.', 'Calle Escena, 1515', 'Madrid', '../images/lugares/TeatroTapas.jpg', 'medio', 4.4, 21, 55, 'informal', 'animado', 'grupo'),
(15, 'El Faro', 'Restaurante elegante con decoración marina y cenas a la luz de las velas con espectáculo de música suave.', 'Calle Costa, 606', 'Madrid', '../images/lugares/ElFaro.jpg', 'alto', 4.8, 24, 60, 'formal', 'romantico', 'pareja'),
(15, 'Bar Teatro Real', 'Bar con música en vivo y tapas gourmet, donde se fusionan cultura y gastronomía.', 'Calle Escenario, 2626', 'Madrid', '../images/lugares/BarTeatroReal.jpg', 'medio', 4.5, 21, 55, 'informal', 'animado', 'grupo'),
(15, 'Oh My Club', 'Discoteca moderna con cenas y espectáculos en vivo. Fusión entre gastronomía y fiesta.', 'Calle de Rosario Pino, 14', 'Madrid', '../images/lugares/ohmyclub.jpg', 'alto', 4.5, 21, 45, 'formal', 'animado', 'grupo'),

-- Subcategoría Estético (16)
(16, 'DiverXO', 'Restaurante 3 estrellas Michelin con experiencia gastronómica inmersiva', 'Calle de Padre Damián, 23', 'Madrid', '../images/lugares/DiverXO.jpg', 'alto', 4.9, 21, 65, 'formal', 'romantico', 'pareja'),
(16, 'Ramses', 'Restaurante con decoración faraónica y cocina mediterránea', 'Calle de Serrano, 39', 'Madrid', '../images/lugares/Ramses.jpg', 'alto', 4.7, 18, 55, 'formal', 'romantico', 'pareja'),
(16, 'Bibo', 'Restaurante diseñado por Philippe Starck con cocina de Dani García', 'Paseo de la Castellana, 52', 'Madrid', '../images/lugares/Bibo.jpg', 'alto', 4.6, 18, 55, 'formal', 'romantico', 'pareja'),
(16, 'Ático de Arzábal', 'Restaurante estética minimalista y vistas de Prado.', 'Paseo del Prado, 18', 'Madrid', '../images/lugares/AticoArzabal.jpeg', 'alto', 4.6, 18, 55, 'formal', 'romantico', 'pareja'),
(16, 'Umami Madrid', 'Diseño japonés contemporáneo y comida estética.', 'Calle de Heron City, 19', 'Madrid', '../images/lugares/Umami.jpg', 'alto', 4.5, 18, 55, 'formal', 'tranquilo', 'pareja'),
(16, 'Nube Lounge', 'Cocktails creativos en un entorno minimalista con decoración elegante y ambiente íntimo.', 'Calle Algodón, 1717', 'Madrid', '../images/lugares/NubeLounge.jpg', 'alto', 4.8, 24, 50, 'formal', 'romantico', 'pareja'),
(16, 'La Sombra', 'Bar con ambiente bohemio y luces tenues, ideal para momentos íntimos y planes románticos en solitario.', 'Calle de San Vicente Ferrer, 33', 'Madrid', '../images/lugares/LaSombra.jpg', 'medio', 4.9, 19, 60, 'formal', 'romantico', 'individual'),
(16, 'StreetXO', 'Restaurante con cocina fusión radical y ambiente urbano, con estética atrevida.', 'Calle de Serrano, 52', 'Madrid', '../images/lugares/streetxo.jpg', 'alto', 4.7, 21, 50, 'informal', 'animado', 'pareja'),

-- Subcategoría Karting nocturno (17)
(17, 'Karting Carlos Sainz', 'Pista de karts profesional con eventos nocturnos', 'Calle del Comercio, 18', 'Madrid', '../images/lugares/KartingCarlosSainz.jpeg', 'medio', 4.5, 16, 50, 'informal', 'animado', 'grupo'),
(17, 'Madrid Kart', 'Circuito de karts con iluminación nocturna', 'Carretera de Andalucía, km 12', 'Madrid', '../images/lugares/MadridKart.jpg', 'medio', 4.3, 16, 50, 'informal', 'animado', 'grupo'),
(17, 'Indoor Karting Getafe', 'Pista cubierta de karts con iluminación.', 'Calle del Lago, 5, Getafe', 'Madrid', '../images/lugares/IndoorKartingGetafe.jpg', 'medio', 4.2, 16, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Golf nocturno (18)
(18, 'Golf Park', 'Campo de golf con iluminación para jugar de noche', 'Carretera de Burgos, km 14', 'Madrid', '../images/lugares/GolfPark.jpeg', 'alto', 4.4, 18, 65, 'formal', 'tranquilo', 'individual'),
(18, 'Urban Golf Madrid', 'Simuladores y minigolf nocturno indoor.', 'Calle de Preciados, 3', 'Madrid', '../images/lugares/UrbanGolfMadrid.jpg', 'medio', 4.3, 16, 60, 'informal', 'tranquilo', 'individual'),

-- Subcategoría Bolera (19)
(19, 'Bowling Chamartín', 'Bolera moderna con bar y música', 'Calle de Bolivia, 13', 'Madrid', '../images/lugares/bowling.jpg', 'bajo', 4.0, 18, 50, 'informal', 'animado', 'grupo'),
(19, 'Boliche', 'Bolera con ambiente retro y cócteles', 'Calle de Alberto Alcocer, 32', 'Madrid', '../images/lugares/Boliche.jpg', 'medio', 4.1, 18, 50, 'informal', 'animado', 'grupo'),
(19, 'Kingpin Bowling', 'Bolera moderna con mesas de billar y bar.', 'Calle de Albasanz, 50', 'Madrid', '../images/lugares/KingpinBowling.jpg', 'medio', 4.2, 18, 50, 'informal', 'animado', 'grupo'),

-- Subcategoría Recreativo (20)
(20, 'Museo del Videojuego', 'Arcade con máquinas retro y modernas', 'Calle de la Luna, 4', 'Madrid', '../images/lugares/MuseoVideojuego.jpg', 'bajo', 4.3, 12, 40, 'informal', 'animado', 'grupo'),
(20, 'Neko Bar', 'Bar de gatos con juegos de mesa', 'Calle de la Palma, 18', 'Madrid', '../images/lugares/NekoBar.jpeg', 'bajo', 4.5, 18, 40, 'informal', 'tranquilo', 'grupo'),
(20, 'Laser Game Madrid', 'Laser tag indoor para grupos y despedidas.', 'Calle de Valportillo, 20', 'Madrid', '../images/lugares/LaserGame.jpg', 'medio', 4.4, 12, 40, 'informal', 'animado', 'grupo'),

-- Subcategoría Música en vivo (21)
(21, 'Sala Sol', 'Sala de conciertos emblemática con programación variada', 'Calle de los Jardines, 3', 'Madrid', '../images/lugares/SalaSol.jpeg', 'medio', 4.4, 18, 50, 'informal', 'animado', 'grupo'),
(21, 'Costello Club', 'Club de música en vivo y cócteles', 'Calle del Caballero de Gracia, 10', 'Madrid', '../images/lugares/CostelloClub.jpeg', 'alto', 4.5, 18, 45, 'informal', 'animado', 'grupo'),
(21, 'Clamores', 'Club de jazz con actuaciones en vivo', 'Calle de Alburquerque, 14', 'Madrid', '../images/lugares/Clamores.jpg', 'medio', 4.6, 18, 60, 'informal', 'tranquilo', 'pareja'),
(21, 'El Cobijo', 'Espacio amplio y alternativo, con conciertos pequeños y zona chill, ideal para grupos con espíritu joven.', 'Calle del Olivar, 17', 'Madrid', '../images/lugares/ElCobijo.jpg', 'bajo', 4.5, 20, 62, 'informal', 'animado', 'grupo'),
(21, 'El Intruso', 'Bar con jazz & blues en directo cada noche.', 'Calle del Príncipe, 12', 'Madrid', '../images/lugares/ElIntruso.jpg', 'medio', 4.5, 18, 60, 'informal', 'tranquilo', 'pareja'),
(21, 'Wurlitzer Ballroom', 'Sala rockabilly con conciertos y baile.', 'Calle del Pez, 12', 'Madrid', '../images/lugares/WurlitzerBallroom.jpg', 'medio', 4.4, 18, 50, 'informal', 'animado', 'grupo'),
(21, 'La Vía Láctea', 'Bar mítico de Malasaña con música en vivo, ambiente joven y alternativo.', 'Calle de Velarde, 18', 'Madrid', '../images/lugares/vialactea.jpg', 'bajo', 4.0, 18, 40, 'informal', 'animado', 'grupo'),
(21, 'Sala Mon', 'Sala de conciertos y club nocturno con programación variada.', 'Calle de Hilarión Eslava, 36', 'Madrid', '../images/lugares/mon.jpg', 'medio', 4.1, 18, 40, 'informal', 'animado', 'grupo'),

-- Subcategoría Teatro (22)
(22, 'Teatro Lara', 'Teatro histórico con programación variada', 'Calle de Corredera Baja de San Pablo, 15', 'Madrid', '../images/lugares/TeatroLara.jpg', 'medio', 4.5, 12, 65, 'formal', 'tranquilo', 'pareja'),
(22, 'La Burbuja', 'Espacio sofisticado con música suave y espacios íntimos, perfecto para encuentros tranquilos en grupo.', 'Calle del Conde de Xiquena, 8', 'Madrid', '../images/lugares/LaBurbuja.jpg', 'medio', 4.7, 18, 60, 'formal', 'tranquilo', 'grupo'),
(22, 'Teatro Español', 'Teatro clásico y moderno con gran tradición.', 'Plaza de Santa Ana, 15', 'Madrid', '../images/lugares/TeatroEspañol.jpg', 'medio', 4.6, 12, 65, 'formal', 'tranquilo', 'pareja'),
(22, 'El Pavón Teatro Kamikaze', 'Apuesta por teatro contemporáneo e independiente.', 'Calle de Embajadores, 9', 'Madrid', '../images/lugares/Pavon.jpg', 'medio', 4.5, 14, 65, 'informal', 'tranquilo', 'pareja'),

-- Subcategoría Arte (23)
(23, 'Museo Reina Sofía', 'Museo de arte contemporáneo con obras de Dalí y Picasso', 'Calle de Santa Isabel, 52', 'Madrid', '../images/lugares/MuseoReinaSofia.jpg', 'bajo', 4.8, 12, 65, 'formal', 'tranquilo', 'individual'),
(23, 'Matadero Madrid', 'Centro cultural en antigua nave industrial', 'Paseo de la Chopera, 14', 'Madrid', '../images/lugares/Matadero.jpg', 'bajo', 4.6, 12, 65, 'informal', 'tranquilo', 'individual'),
(23, 'CaixaForum Madrid', 'Centro cultural con exposiciones temporales', 'Paseo del Prado, 36', 'Madrid', '../images/lugares/CaixaForum.jpg', 'bajo', 4.5, 12, 65, 'formal', 'tranquilo', 'individual'),
(23, 'Tabacalera La Fragua', 'Centro de arte urbano en espacio autogestionado.', 'Calle de Embajadores, 53', 'Madrid', '../images/lugares/TabacaleraLaFragua.jpg', 'bajo', 4.4, 12, 65, 'informal', 'tranquilo', 'individual'),
(23, 'Fundación Canal', 'Exposiciones de fotografía e ilustración contemporánea.', 'Calle de Mateo Inurria, 2', 'Madrid', '../images/lugares/FundacionCanal.jpg', 'bajo', 4.3, 12, 65, 'formal', 'tranquilo', 'individual'),
(23, 'La Neomudéjar', 'Centro de arte contemporáneo en una antigua estación de tren, con exposiciones rompedoras.', 'Calle de Antonio Nebrija, s/n', 'Madrid', '../images/lugares/neomudejar.jpg', 'bajo', 4.5, 18, 65, 'informal', 'tranquilo', 'individual');

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
-- Teatro Kapital 
( 6, 'Kapital Gold Nights', 'Noche exclusiva con zona VIP, champán y música house', '2025-07-05',40.00, 'House', 'Elegante', 'eventos/kapital_gold.jpg',23, 40, 'formal', 'animado', 'pareja'),

-- Opium Madrid 
(24, 'White Party', 'Fiesta temática en blanco con música electrónica y show de luces', '2025-08-09',30.00, 'Electrónica', 'Blanco total', 'eventos/opium_white.jpg',21, 35, 'formal', 'animado', 'grupo'),

-- Sala Equis
(77, 'Cine + Indie Live', 'Proyección de cortos + concierto indie acústico', '2025-06-22',8.00, 'Indie', 'Casual', 'eventos/equis_cineindie.jpg',18, 40, 'informal', 'tranquilo', 'pareja'),

-- Bodega de la Ardosa 
(75, 'Cerveza y Flamenco', 'Muestra de flamenco en vivo con degustación de cervezas artesanas', '2025-09-14',10.00, 'Flamenco', 'Rústico', 'eventos/ardosa_flamenco.jpg',30, 60, 'informal', 'tranquilo', 'pareja'),

-- Fabrik 
(15, 'Techno Reload', 'Evento de techno con más de 6 horas de DJs internacionales', '2025-08-03',38.00, 'Techno', 'Libre', 'eventos/fabrik_techno.jpg',18, 35, 'informal', 'animado', 'grupo'),

-- Shôko Madrid 
(25, 'R&B Sunset Vibes', 'R&B moderno con cócteles al aire libre desde el atardecer', '2025-07-10',20.00, 'R&B', 'Urbano', 'eventos/shoko_rnb.jpg',21, 35, 'formal', 'animado', 'pareja'),

-- Sala Mon 
(123, 'Indie Rock Night', 'Noche de bandas indie con cerveza artesanal y ambiente alternativo', '2025-06-15',16.00, 'Indie Rock', 'Informal', 'eventos/mon_indierock.jpg',20, 40, 'informal', 'animado', 'grupo'),

-- La Venencia 
(76, 'Versos y Vinos', 'Recital poético con degustación de vino jerezano', '2025-10-05',10.00, 'Instrumental', 'Elegante', 'eventos/venencia_poetas.jpg',30, 65, 'formal', 'tranquilo', 'pareja'),

-- Oh My Club 
(96, 'Cena & Show Deluxe', 'Cena gourmet con espectáculo de cabaret y música house', '2025-07-12',50.00, 'House', 'Elegante', 'eventos/ohmyclub_dinner.jpg',25, 45, 'formal', 'animado', 'pareja'),

-- La Vía Láctea 
(122, 'Rock & Roll Revival', 'Clásicos del rock de los 70s y 80s con banda en directo', '2025-06-28',12.00, 'Rock', 'Casual', 'eventos/vialactea_rock.jpg',18, 40, 'informal', 'vibrante', 'grupo'),

-- El Jardín Secreto 
(62, 'Noches Románticas', 'Velada íntima con jazz en vivo y cócteles especiales', '2025-07-20',18.00, 'Jazz', 'Formal', 'eventos/jardin_jazz.jpg',21, 50, 'formal', 'tranquilo', 'pareja'),

-- The Irish Rover
(45, 'Noche Irlandesa', 'Concierto de folk irlandés y degustación de cervezas', '2025-08-01',10.00, 'Folk', 'Casual', 'eventos/irish_folk.jpg',18, 50, 'informal', 'animado', 'grupo'),

-- Azotea del Círculo de Bellas Artes 
(37, 'Sunset Chillout', 'DJ set con ambient chill y vistas panorámicas', '2025-07-25',25.00, 'Chillout', 'Elegante', 'eventos/azotea_chill.jpg',21, 60, 'formal', 'tranquilo', 'pareja'),

-- Bowling Chamartín 
(110, 'Noche Retro Bowling', 'Torneo de bolos temático años 80 con premios', '2025-06-30',8.00, 'Pop 80s', 'Retro', 'eventos/bowling_retro.png',18, 50, 'informal', 'animado', 'grupo'),

-- Medias Puri 
(87, 'Puri Underground Show', 'Noche con performances alternativas y música electrónica', '2025-08-17',35.00, 'Electrónica', 'Libre', 'eventos/puri_show.jpg', 21, 50, 'informal', 'animado', 'grupo'),

-- La Neomudéjar
(133, 'Arte Sonoro Live', 'Instalación audiovisual y música experimental en directo', '2025-07-18',15.00, 'Experimental', 'Creativo', 'eventos/neomudejar_sound.png',18, 65, 'informal', 'tranquilo', 'individual'),

-- StreetXO 
(104, 'XO Fusion Party', 'Showcooking con DJ y cócteles de autor', '2025-07-08',45.00, 'Fusión electrónica', 'Urbano', 'eventos/streetxo_fusion.png', 21, 50, 'informal', 'animado', 'pareja'),

-- 1862 Dry Bar 
(47, 'Coctelería y Jazz', 'Clase de mixología con música en vivo estilo jazz', '2025-06-27', 20.00, 'Jazz', 'Formal', 'eventos/1862_jazzmix.jpg', 21, 55, 'formal', 'tranquilo', 'pareja'),

-- Teatro Kapital
(6, 'Kapital White Night', 'Fiesta temática de blanco en todas las plantas del club.', '2025-07-05', 25.00, 'house, reguetón', 'blanco total', '../images/eventos/KapitalWhiteNight.jpg', 21, 40, 'formal', 'animado', 'grupo'),

-- Mondo Disko
(7, 'Techno Underground Session', 'Sesión exclusiva con DJs de Berlín en Mondo Disko.', '2025-07-12', 20.00, 'techno', 'negro', '../images/eventos/TechnoUndergroundSession.jpg', 18, 35, 'informal', 'animado', 'grupo'),

-- Fabrik
(15, 'Fabrik Night Festival', 'Festival nocturno con luces LED y los mejores DJs de techno.', '2025-08-10', 35.00, 'techno', 'casual', '../images/eventos/FabrikNightFestival.jpg', 18, 40, 'informal', 'animado', 'grupo'),

-- Opium Madrid
(24, 'Reggaeton Deluxe', 'Noche exclusiva de reguetón con artistas invitados.', '2025-07-20', 28.00, 'reguetón', 'chic', '../images/eventos/ReggaetonDeluxe.jpg', 21, 40, 'formal', 'animado', 'grupo'),

-- Shôko Madrid
(25, 'Tokyo Nights', 'Fiesta inspirada en Japón, reguetón fusión y gastronomía temática.', '2025-07-27', 30.00, 'reguetón, fusión', 'temático', '../images/eventos/TokyoNights.jpg', 18, 40, 'formal', 'animado', 'grupo'),

-- Ginkgo Sky Bar
(28, 'Sky Sunset Sessions', 'Música chill al atardecer con cócteles en Ginkgo Sky Bar.', '2025-07-18', 15.00, 'chill, house', 'casual elegante', '../images/eventos/SkySunSet.jpg', 21, 50, 'formal', 'tranquilo', 'pareja'),

-- Salmon Guru
(46, 'Cócteles & Jazz', 'Noche de cócteles de autor y jazz en vivo.', '2025-07-11', 18.00, 'jazz', 'elegante', '../images/eventos/CoctelesJazz.jpg', 21, 50, 'formal', 'tranquilo', 'pareja'),

-- Corral de la Morería
(55, 'Noches Flamencas de Verano', 'Cena espectáculo en Corral de la Morería con artistas flamencos.', '2025-07-13', 50.00, 'flamenco', 'formal', '../images/eventos/NochesFlamencas.jpg', 18, 65, 'formal', 'romantico', 'pareja'),

-- Sala Sol
(116, 'Noche Indie en Sala Sol', 'Concierto de bandas emergentes del panorama indie español.', '2025-07-06', 12.00, 'indie, pop rock', 'informal', '../images/eventos/NocheIndie.jpg', 18, 50, 'informal', 'animado', 'grupo'),

-- Museo Reina Sofía
(128, 'Exposición Dalí After Dark', 'Visita nocturna especial con ambientación artística en el Reina Sofía.', '2025-07-22', 10.00, 'arte contemporáneo', 'cultural', '../images/eventos/ExposicionDali.jpeg', 18, 65, 'formal', 'tranquilo', 'individual'),

-- The Principal
(26, 'Sunset & Chill', 'Sesión relajada con DJ en vivo al atardecer en The Principal.', '2025-07-19', 18.00, 'chill out, lounge', 'smart casual', '../images/eventos/SunsetChill.jpg', 23, 50, 'formal', 'tranquilo', 'pareja'),

-- The Irish Rover
(45, 'Irish Live Sessions', 'Música en vivo con grupos de folk y ambiente irlandés.', '2025-07-25', 10.00, 'folk, rock', 'informal', '../images/eventos/IrishLive.jpg', 18, 50, 'informal', 'animado', 'grupo'),

-- Laberinto
(53, 'Escape Laberinto', 'Experiencia nocturna con juegos de pistas y luces en Laberinto.', '2025-08-02', 12.00, 'ambiental', 'casual oscuro', '../images/eventos/EscapeLaberinto.jpg', 21, 45, 'informal', 'animado', 'grupo'),

-- Refugio 66
(59, 'Velada Acústica', 'Sesiones íntimas de música en vivo con luz tenue en Refugio 66.', '2025-07-28', 14.00, 'acústico', 'casual elegante', '../images/eventos/VeladaAcustica.jpg', 19, 47, 'informal', 'tranquilo', 'pareja'),

-- Brasa Bar
(69, 'Brasa Nights', 'Cena degustación con música jazz en vivo y vinos premium.', '2025-07-20', 45.00, 'jazz', 'formal', '../images/eventos/BrasaNights.jpeg', 25, 60, 'formal', 'romantico', 'pareja'),

-- Platea Madrid
(82, 'Cultura Urbana en Vivo', 'Evento de cocina en directo y danza urbana.', '2025-08-03', 20.00, 'fusión, urbana', 'moderno', '../images/eventos/CulturaUrbana.jpg', 18, 55, 'informal', 'animado', 'grupo'),

-- Tablao Flamenco 1911
(91, 'Tablao de Estrellas', 'Gala flamenca especial con bailaores premiados.', '2025-07-30', 50.00, 'flamenco', 'elegante', '../images/eventos/TablaoEstrellas.jpg', 18, 65, 'formal', 'romantico', 'pareja'),

-- Ático de Arzábal
(100, 'Cena entre Cuadros', 'Velada con cena y arte en el Ático de Arzábal con vistas al Prado.', '2025-07-26', 48.00, 'clásica, jazz', 'elegante', '../images/eventos/CenaCuadros.jpg', 18, 55, 'formal', 'romantico', 'pareja'),

-- Laser Game Evolution
(115, 'Laser Battle Royale', 'Competencia nocturna por equipos en Laser Game.', '2025-07-21', 16.00, 'electrónica', 'ropa deportiva', '../images/eventos/LaserBattleRoyale.jpg', 12, 40, 'informal', 'animado', 'grupo'),

-- Fundación Canal
(132, 'FotoForum Nocturno', 'Encuentro de fotógrafos con talleres y exposición en la Fundación Canal.', '2025-07-24', 8.00, 'ambiental, instrumental', 'informal', '../images/eventos/FotoForumNocturno.jpg', 16, 65, 'formal', 'tranquilo', 'individual');

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
INSERT INTO favoritos_lugares (id_usuario, id_lugar) VALUES
-- Marta Fernández (id_usuario = 1)
(1, 21),  -- Nebula Club
(1, 28),  -- Ginkgo Sky Bar
(1, 128), -- Museo Reina Sofía
(1, 88), -- Teatro Kapital dinner show

-- Andrés López (id_usuario = 2)
(2, 7),   -- Mondo Disko
(2, 8),   -- Stardust
(2, 131), -- Tabacalera La Fragua
(2, 38),  -- The James Joyce
(2, 25),  -- Shoko Madrid

-- Claudia Romero (id_usuario = 3)
(3, 1),   -- Pachá Madrid
(3, 28),  -- Ginkgo Sky Bar
(3, 37),  -- Azotea del Círculo
(3, 74), -- Jazz & Libros
(3, 124), -- Teatro Lara

-- Yohana Manteca (id_usuario = 4)
(4, 9),  -- LAB Club
(4, 19),  -- Stereobar
(4, 50),  -- Bar &Co
(4, 132), -- Fundación Canal
(4, 120), -- El Intruso

-- Adrián Arcones (id_usuario = 5)
(5, 110), -- Bowling Chamartín
(5, 112), -- Kingpin Bowling
(5, 116), -- Sala Sol
(5, 126), -- Teatro Español
(5, 127); -- El Pavón Teatro Kamikaze

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
INSERT INTO reservas_eventos (id_usuario, id_evento, usuario_reserva, email_reserva, fecha_reserva, cantidad, estado) VALUES
-- Marta Fernández
(1, 6, 'Marta Fernández', 'marta.fernandez@gmail.com', DEFAULT, 2, 'confirmada'),
(1, 12, 'Marta Fernández', 'marta.fernandez@gmail.com', DEFAULT, 1, 'confirmada'),
(1, 18, 'Marta Fernández', 'marta.fernandez@gmail.com', DEFAULT, 2, 'confirmada'),

-- Andrés López
(2, 7, 'Andrés López', 'andres.lopez@hotmail.com', DEFAULT, 3, 'confirmada'),
(2, 13, 'Andrés López', 'andres.lopez@hotmail.com', DEFAULT, 2, 'confirmada'),
(2, 21, 'Andrés López', 'andres.lopez@hotmail.com', DEFAULT, 4, 'confirmada'),

-- Claudia Romero
(3, 3, 'Claudia Romero', 'claudia.romero@yahoo.com', DEFAULT, 1, 'confirmada'),
(3, 8, 'Claudia Romero', 'claudia.romero@yahoo.com', DEFAULT, 3, 'confirmada'),
(3, 20, 'Claudia Romero', 'claudia.romero@yahoo.com', DEFAULT, 2, 'confirmada'),

-- Yohana Manteca
(4, 5, 'Yohana Manteca', 'yohanamanteca@gmail.com', DEFAULT, 2, 'confirmada'),
(4, 9, 'Yohana Manteca', 'yohanamanteca@gmail.com', DEFAULT, 2, 'confirmada'),
(4, 17, 'Yohana Manteca', 'yohanamanteca@gmail.com', DEFAULT, 1, 'confirmada'),

-- Adrián Arcones
(5, 2, 'Adrián Arcones', 'adrianarconesgomez@gmail.com', DEFAULT, 3, 'confirmada'),
(5, 10, 'Adrián Arcones', 'adrianarconesgomez@gmail.com', DEFAULT, 4, 'confirmada'),
(5, 24, 'Adrián Arcones', 'adrianarconesgomez@gmail.com', DEFAULT, 2, 'confirmada');

CREATE TABLE IF NOT EXISTS horarios_lugar (
  id_horario INT AUTO_INCREMENT PRIMARY KEY,
  id_lugar INT NOT NULL,
  dia VARCHAR(20) NOT NULL,
  hora_apertura TIME NOT NULL,
  hora_cierre TIME NOT NULL,
  FOREIGN KEY (id_lugar) REFERENCES lugares(id_lugar) ON DELETE CASCADE,
  UNIQUE (id_lugar, dia)
);
INSERT IGNORE INTO horarios_lugar (id_lugar, dia, hora_apertura, hora_cierre) VALUES
(1, 'Jueves', '22:00:00', '03:00:00'),
(1, 'Viernes', '23:00:00', '05:30:00'),
(1, 'Sábado', '23:00:00', '06:00:00'),

(2, 'Jueves', '22:00:00', '03:00:00'),
(2, 'Viernes', '23:00:00', '05:30:00'),
(2, 'Sábado', '23:00:00', '06:00:00'),

(3, 'Jueves', '22:00:00', '03:00:00'),
(3, 'Viernes', '23:00:00', '05:30:00'),
(3, 'Sábado', '23:00:00', '06:00:00'),

(4, 'Jueves', '22:00:00', '03:00:00'),
(4, 'Viernes', '23:00:00', '05:30:00'),
(4, 'Sábado', '23:00:00', '06:00:00'),

(5, 'Jueves', '22:00:00', '03:00:00'),
(5, 'Viernes', '23:00:00', '05:30:00'),
(5, 'Sábado', '23:00:00', '06:00:00'),

(6, 'Jueves', '22:00:00', '03:00:00'),
(6, 'Viernes', '23:00:00', '05:30:00'),
(6, 'Sábado', '23:00:00', '06:00:00'),

(7, 'Jueves', '23:00:00', '04:00:00'),
(7, 'Viernes', '00:00:00', '06:00:00'),
(7, 'Sábado', '00:00:00', '06:30:00'),

(8, 'Jueves', '23:00:00', '04:00:00'),
(8, 'Viernes', '00:00:00', '06:00:00'),
(8, 'Sábado', '00:00:00', '06:30:00'),

(9, 'Jueves', '23:00:00', '04:00:00'),
(9, 'Viernes', '00:00:00', '06:00:00'),
(9, 'Sábado', '00:00:00', '06:30:00'),

(10, 'Jueves', '23:00:00', '04:00:00'),
(10, 'Viernes', '00:00:00', '06:00:00'),
(10, 'Sábado', '00:00:00', '06:30:00'),

(11, 'Jueves', '23:00:00', '04:00:00'),
(11, 'Viernes', '00:00:00', '06:00:00'),
(11, 'Sábado', '00:00:00', '06:30:00'),

(12, 'Jueves', '23:00:00', '04:00:00'),
(12, 'Viernes', '00:00:00', '06:00:00'),
(12, 'Sábado', '00:00:00', '06:30:00'),

(13, 'Jueves', '23:00:00', '04:00:00'),
(13, 'Viernes', '00:00:00', '06:00:00'),
(13, 'Sábado', '00:00:00', '06:30:00'),

(14, 'Jueves', '23:00:00', '04:00:00'),
(14, 'Viernes', '00:00:00', '06:00:00'),
(14, 'Sábado', '00:00:00', '06:30:00'),

(15, 'Jueves', '23:00:00', '04:00:00'),
(15, 'Viernes', '00:00:00', '06:00:00'),
(15, 'Sábado', '00:00:00', '06:30:00'),

(16, 'Jueves', '22:00:00', '03:00:00'),
(16, 'Viernes', '23:00:00', '05:30:00'),
(16, 'Sábado', '23:00:00', '06:00:00'),

(17, 'Jueves', '22:00:00', '03:00:00'),
(17, 'Viernes', '23:00:00', '05:30:00'),
(17, 'Sábado', '23:00:00', '06:00:00'),

(18, 'Jueves', '22:00:00', '03:00:00'),
(18, 'Viernes', '23:00:00', '05:30:00'),
(18, 'Sábado', '23:00:00', '06:00:00'),

(19, 'Jueves', '22:00:00', '03:00:00'),
(19, 'Viernes', '23:00:00', '05:30:00'),
(19, 'Sábado', '23:00:00', '06:00:00'),

(20, 'Jueves', '22:00:00', '03:00:00'),
(20, 'Viernes', '23:00:00', '05:30:00'),
(20, 'Sábado', '23:00:00', '06:00:00'),

(21, 'Jueves', '22:00:00', '03:00:00'),
(21, 'Viernes', '23:00:00', '05:30:00'),
(21, 'Sábado', '23:00:00', '06:00:00'),

(22, 'Jueves', '22:00:00', '03:00:00'),
(22, 'Viernes', '23:00:00', '05:30:00'),
(22, 'Sábado', '23:00:00', '06:00:00'),

(23, 'Jueves', '22:00:00', '03:00:00'),
(23, 'Viernes', '23:00:00', '05:30:00'),
(23, 'Sábado', '23:00:00', '06:00:00'),

(24, 'Jueves', '22:00:00', '03:00:00'),
(24, 'Viernes', '23:00:00', '05:30:00'),
(24, 'Sábado', '23:00:00', '06:00:00'),

(25, 'Jueves', '22:00:00', '03:00:00'),
(25, 'Viernes', '23:00:00', '05:30:00'),
(25, 'Sábado', '23:00:00', '06:00:00'),

(26, 'Jueves', '22:00:00', '03:00:00'),
(26, 'Viernes', '23:00:00', '05:30:00'),
(26, 'Sábado', '23:00:00', '06:00:00'),

(27, 'Jueves', '18:00:00', '00:00:00'),
(27, 'Viernes', '18:00:00', '01:00:00'),
(27, 'Sábado', '18:00:00', '01:30:00'),
(27, 'Domingo', '17:00:00', '00:00:00'),

(28, 'Jueves', '18:00:00', '00:00:00'),
(28, 'Viernes', '18:00:00', '01:00:00'),
(28, 'Sábado', '18:00:00', '01:30:00'),
(28, 'Domingo', '17:00:00', '00:00:00'),

(29, 'Jueves', '18:00:00', '00:00:00'),
(29, 'Viernes', '18:00:00', '01:00:00'),
(29, 'Sábado', '18:00:00', '01:30:00'),
(29, 'Domingo', '17:00:00', '00:00:00'),

(30, 'Jueves', '18:00:00', '00:00:00'),
(30, 'Viernes', '18:00:00', '01:00:00'),
(30, 'Sábado', '18:00:00', '01:30:00'),
(30, 'Domingo', '17:00:00', '00:00:00'),

(31, 'Jueves', '18:00:00', '00:00:00'),
(31, 'Viernes', '18:00:00', '01:00:00'),
(31, 'Sábado', '18:00:00', '01:30:00'),
(31, 'Domingo', '17:00:00', '00:00:00'),

(32, 'Jueves', '18:00:00', '00:00:00'),
(32, 'Viernes', '18:00:00', '01:00:00'),
(32, 'Sábado', '18:00:00', '01:30:00'),
(32, 'Domingo', '17:00:00', '00:00:00'),

(33, 'Jueves', '18:00:00', '00:00:00'),
(33, 'Viernes', '18:00:00', '01:00:00'),
(33, 'Sábado', '18:00:00', '01:30:00'),
(33, 'Domingo', '17:00:00', '00:00:00'),

(34, 'Jueves', '18:00:00', '00:00:00'),
(34, 'Viernes', '18:00:00', '01:00:00'),
(34, 'Sábado', '18:00:00', '01:30:00'),
(34, 'Domingo', '17:00:00', '00:00:00'),

(35, 'Jueves', '18:00:00', '00:00:00'),
(35, 'Viernes', '18:00:00', '01:00:00'),
(35, 'Sábado', '18:00:00', '01:30:00'),
(35, 'Domingo', '17:00:00', '00:00:00'),

(36, 'Jueves', '18:00:00', '00:00:00'),
(36, 'Viernes', '18:00:00', '01:00:00'),
(36, 'Sábado', '18:00:00', '01:30:00'),
(36, 'Domingo', '17:00:00', '00:00:00'),

(37, 'Jueves', '18:00:00', '00:00:00'),
(37, 'Viernes', '18:00:00', '01:00:00'),
(37, 'Sábado', '18:00:00', '01:30:00'),
(37, 'Domingo', '17:00:00', '00:00:00'),

(38, 'Jueves', '18:00:00', '00:00:00'),
(38, 'Viernes', '18:00:00', '01:00:00'),
(38, 'Sábado', '18:00:00', '01:30:00'),
(38, 'Domingo', '17:00:00', '00:00:00'),

(39, 'Jueves', '18:00:00', '00:00:00'),
(39, 'Viernes', '18:00:00', '01:00:00'),
(39, 'Sábado', '18:00:00', '01:30:00'),
(39, 'Domingo', '17:00:00', '00:00:00'),

(40, 'Jueves', '18:00:00', '02:00:00'),
(40, 'Viernes', '18:00:00', '03:00:00'),
(40, 'Sábado', '18:00:00', '03:00:00'),
(40, 'Domingo', '17:00:00', '01:00:00'),

(41, 'Jueves', '18:00:00', '02:00:00'),
(41, 'Viernes', '18:00:00', '03:00:00'),
(41, 'Sábado', '18:00:00', '03:00:00'),
(41, 'Domingo', '17:00:00', '01:00:00'),

(42, 'Jueves', '18:00:00', '02:00:00'),
(42, 'Viernes', '18:00:00', '03:00:00'),
(42, 'Sábado', '18:00:00', '03:00:00'),
(42, 'Domingo', '17:00:00', '01:00:00'),

(43, 'Jueves', '18:00:00', '02:00:00'),
(43, 'Viernes', '18:00:00', '03:00:00'),
(43, 'Sábado', '18:00:00', '03:00:00'),
(43, 'Domingo', '17:00:00', '01:00:00'),

(44, 'Jueves', '18:00:00', '02:00:00'),
(44, 'Viernes', '18:00:00', '03:00:00'),
(44, 'Sábado', '18:00:00', '03:00:00'),
(44, 'Domingo', '17:00:00', '01:00:00'),

(45, 'Jueves', '18:00:00', '02:00:00'),
(45, 'Viernes', '18:00:00', '03:00:00'),
(45, 'Sábado', '18:00:00', '03:00:00'),
(45, 'Domingo', '17:00:00', '01:00:00'),

(46, 'Jueves', '18:00:00', '02:00:00'),
(46, 'Viernes', '18:00:00', '03:00:00'),
(46, 'Sábado', '18:00:00', '03:00:00'),
(46, 'Domingo', '17:00:00', '01:00:00'),

(47, 'Jueves', '18:00:00', '02:00:00'),
(47, 'Viernes', '18:00:00', '03:00:00'),
(47, 'Sábado', '18:00:00', '03:00:00'),
(47, 'Domingo', '17:00:00', '01:00:00'),

(48, 'Jueves', '19:00:00', '02:00:00'),
(48, 'Viernes', '19:00:00', '03:00:00'),
(48, 'Sábado', '19:00:00', '03:30:00'),

(49, 'Jueves', '19:00:00', '02:00:00'),
(49, 'Viernes', '19:00:00', '03:00:00'),
(49, 'Sábado', '19:00:00', '03:30:00'),

(50, 'Jueves', '19:00:00', '02:00:00'),
(50, 'Viernes', '19:00:00', '03:00:00'),
(50, 'Sábado', '19:00:00', '03:30:00'),

(51, 'Jueves', '19:00:00', '02:00:00'),
(51, 'Viernes', '19:00:00', '03:00:00'),
(51, 'Sábado', '19:00:00', '03:30:00'),

(52, 'Jueves', '19:00:00', '02:00:00'),
(52, 'Viernes', '19:00:00', '03:00:00'),
(52, 'Sábado', '19:00:00', '03:30:00'),

(53, 'Jueves', '19:00:00', '02:00:00'),
(53, 'Viernes', '19:00:00', '03:00:00'),
(53, 'Sábado', '19:00:00', '03:30:00'),

(54, 'Jueves', '19:00:00', '02:00:00'),
(54, 'Viernes', '19:00:00', '03:00:00'),
(54, 'Sábado', '19:00:00', '03:30:00'),

(55, 'Jueves', '19:00:00', '02:00:00'),
(55, 'Viernes', '19:00:00', '03:00:00'),
(55, 'Sábado', '19:00:00', '03:30:00'),

(56, 'Jueves', '19:00:00', '02:00:00'),
(56, 'Viernes', '19:00:00', '03:00:00'),
(56, 'Sábado', '19:00:00', '03:30:00'),

(57, 'Miércoles', '20:00:00', '23:30:00'),
(57, 'Jueves', '20:00:00', '00:00:00'),
(57, 'Viernes', '20:00:00', '00:30:00'),
(57, 'Sábado', '20:00:00', '01:00:00'),
(57, 'Domingo', '19:00:00', '23:00:00'),

(58, 'Miércoles', '20:00:00', '23:30:00'),
(58, 'Jueves', '20:00:00', '00:00:00'),
(58, 'Viernes', '20:00:00', '00:30:00'),
(58, 'Sábado', '20:00:00', '01:00:00'),
(58, 'Domingo', '19:00:00', '23:00:00'),

(59, 'Miércoles', '20:00:00', '23:30:00'),
(59, 'Jueves', '20:00:00', '00:00:00'),
(59, 'Viernes', '20:00:00', '00:30:00'),
(59, 'Sábado', '20:00:00', '01:00:00'),
(59, 'Domingo', '19:00:00', '23:00:00'),

(60, 'Miércoles', '20:00:00', '23:30:00'),
(60, 'Jueves', '20:00:00', '00:00:00'),
(60, 'Viernes', '20:00:00', '00:30:00'),
(60, 'Sábado', '20:00:00', '01:00:00'),
(60, 'Domingo', '19:00:00', '23:00:00'),

(61, 'Miércoles', '20:00:00', '23:30:00'),
(61, 'Jueves', '20:00:00', '00:00:00'),
(61, 'Viernes', '20:00:00', '00:30:00'),
(61, 'Sábado', '20:00:00', '01:00:00'),
(61, 'Domingo', '19:00:00', '23:00:00'),

(62, 'Miércoles', '20:00:00', '23:30:00'),
(62, 'Jueves', '20:00:00', '00:00:00'),
(62, 'Viernes', '20:00:00', '00:30:00'),
(62, 'Sábado', '20:00:00', '01:00:00'),
(62, 'Domingo', '19:00:00', '23:00:00'),

(63, 'Miércoles', '20:00:00', '23:30:00'),
(63, 'Jueves', '20:00:00', '00:00:00'),
(63, 'Viernes', '20:00:00', '00:30:00'),
(63, 'Sábado', '20:00:00', '01:00:00'),
(63, 'Domingo', '19:00:00', '23:00:00'),

(64, 'Miércoles', '20:00:00', '23:30:00'),
(64, 'Jueves', '20:00:00', '00:00:00'),
(64, 'Viernes', '20:00:00', '00:30:00'),
(64, 'Sábado', '20:00:00', '01:00:00'),
(64, 'Domingo', '19:00:00', '23:00:00'),

(65, 'Miércoles', '20:00:00', '23:30:00'),
(65, 'Jueves', '20:00:00', '00:00:00'),
(65, 'Viernes', '20:00:00', '00:30:00'),
(65, 'Sábado', '20:00:00', '01:00:00'),
(65, 'Domingo', '19:00:00', '23:00:00'),

(66, 'Martes', '13:00:00', '16:00:00'),
(66, 'Miércoles', '13:00:00', '16:00:00'),
(66, 'Jueves', '13:00:00', '16:00:00'),
(66, 'Viernes', '13:00:00', '16:00:00'),
(66, 'Sábado', '13:00:00', '16:30:00'),
(66, 'Domingo', '13:00:00', '16:30:00'),

(67, 'Martes', '13:00:00', '16:00:00'),
(67, 'Miércoles', '13:00:00', '16:00:00'),
(67, 'Jueves', '13:00:00', '16:00:00'),
(67, 'Viernes', '13:00:00', '16:00:00'),
(67, 'Sábado', '13:00:00', '16:30:00'),
(67, 'Domingo', '13:00:00', '16:30:00'),

(68, 'Martes', '13:00:00', '16:00:00'),
(68, 'Miércoles', '13:00:00', '16:00:00'),
(68, 'Jueves', '13:00:00', '16:00:00'),
(68, 'Viernes', '13:00:00', '16:00:00'),
(68, 'Sábado', '13:00:00', '16:30:00'),
(68, 'Domingo', '13:00:00', '16:30:00'),

(69, 'Martes', '13:00:00', '16:00:00'),
(69, 'Miércoles', '13:00:00', '16:00:00'),
(69, 'Jueves', '13:00:00', '16:00:00'),
(69, 'Viernes', '13:00:00', '16:00:00'),
(69, 'Sábado', '13:00:00', '16:30:00'),
(69, 'Domingo', '13:00:00', '16:30:00'),

(70, 'Martes', '13:00:00', '16:00:00'),
(70, 'Miércoles', '13:00:00', '16:00:00'),
(70, 'Jueves', '13:00:00', '16:00:00'),
(70, 'Viernes', '13:00:00', '16:00:00'),
(70, 'Sábado', '13:00:00', '16:30:00'),
(70, 'Domingo', '13:00:00', '16:30:00'),

(71, 'Martes', '13:00:00', '16:00:00'),
(71, 'Miércoles', '13:00:00', '16:00:00'),
(71, 'Jueves', '13:00:00', '16:00:00'),
(71, 'Viernes', '13:00:00', '16:00:00'),
(71, 'Sábado', '13:00:00', '16:30:00'),
(71, 'Domingo', '13:00:00', '16:30:00'),

(72, 'Martes', '13:00:00', '16:00:00'),
(72, 'Miércoles', '13:00:00', '16:00:00'),
(72, 'Jueves', '13:00:00', '16:00:00'),
(72, 'Viernes', '13:00:00', '16:00:00'),
(72, 'Sábado', '13:00:00', '16:30:00'),
(72, 'Domingo', '13:00:00', '16:30:00'),

(73, 'Martes', '13:00:00', '16:00:00'),
(73, 'Miércoles', '13:00:00', '16:00:00'),
(73, 'Jueves', '13:00:00', '16:00:00'),
(73, 'Viernes', '13:00:00', '16:00:00'),
(73, 'Sábado', '13:00:00', '16:30:00'),
(73, 'Domingo', '13:00:00', '16:30:00'),

(74, 'Martes', '13:00:00', '16:00:00'),
(74, 'Miércoles', '13:00:00', '16:00:00'),
(74, 'Jueves', '13:00:00', '16:00:00'),
(74, 'Viernes', '13:00:00', '16:00:00'),
(74, 'Sábado', '13:00:00', '16:30:00'),
(74, 'Domingo', '13:00:00', '16:30:00'),

(75, 'Martes', '13:00:00', '16:00:00'),
(75, 'Miércoles', '13:00:00', '16:00:00'),
(75, 'Jueves', '13:00:00', '16:00:00'),
(75, 'Viernes', '13:00:00', '16:00:00'),
(75, 'Sábado', '13:00:00', '16:30:00'),
(75, 'Domingo', '13:00:00', '16:30:00'),

(76, 'Martes', '13:00:00', '16:00:00'),
(76, 'Miércoles', '13:00:00', '16:00:00'),
(76, 'Jueves', '13:00:00', '16:00:00'),
(76, 'Viernes', '13:00:00', '16:00:00'),
(76, 'Sábado', '13:00:00', '16:30:00'),
(76, 'Domingo', '13:00:00', '16:30:00'),

(77, 'Martes', '13:00:00', '16:00:00'),
(77, 'Miércoles', '13:00:00', '16:00:00'),
(77, 'Jueves', '13:00:00', '16:00:00'),
(77, 'Viernes', '13:00:00', '16:00:00'),
(77, 'Sábado', '13:00:00', '16:30:00'),
(77, 'Domingo', '13:00:00', '16:30:00'),

(78, 'Martes', '13:00:00', '16:00:00'),
(78, 'Miércoles', '13:00:00', '16:00:00'),
(78, 'Jueves', '13:00:00', '16:00:00'),
(78, 'Viernes', '13:00:00', '16:00:00'),
(78, 'Sábado', '13:00:00', '16:30:00'),
(78, 'Domingo', '13:00:00', '16:30:00'),

(79, 'Martes', '13:00:00', '16:00:00'),
(79, 'Miércoles', '13:00:00', '16:00:00'),
(79, 'Jueves', '13:00:00', '16:00:00'),
(79, 'Viernes', '13:00:00', '16:00:00'),
(79, 'Sábado', '13:00:00', '16:30:00'),
(79, 'Domingo', '13:00:00', '16:30:00'),

(80, 'Martes', '13:00:00', '16:00:00'),
(80, 'Miércoles', '13:00:00', '16:00:00'),
(80, 'Jueves', '13:00:00', '16:00:00'),
(80, 'Viernes', '13:00:00', '16:00:00'),
(80, 'Sábado', '13:00:00', '16:30:00'),
(80, 'Domingo', '13:00:00', '16:30:00'),

(81, 'Miércoles', '19:00:00', '23:30:00'),
(81, 'Jueves', '19:00:00', '00:30:00'),
(81, 'Viernes', '19:30:00', '02:00:00'),
(81, 'Sábado', '19:30:00', '02:30:00'),
(81, 'Domingo', '18:30:00', '23:00:00'),

(82, 'Miércoles', '19:00:00', '23:30:00'),
(82, 'Jueves', '19:00:00', '00:30:00'),
(82, 'Viernes', '19:30:00', '02:00:00'),
(82, 'Sábado', '19:30:00', '02:30:00'),
(82, 'Domingo', '18:30:00', '23:00:00'),

(83, 'Miércoles', '19:00:00', '23:30:00'),
(83, 'Jueves', '19:00:00', '00:30:00'),
(83, 'Viernes', '19:30:00', '02:00:00'),
(83, 'Sábado', '19:30:00', '02:30:00'),
(83, 'Domingo', '18:30:00', '23:00:00'),

(84, 'Miércoles', '19:00:00', '23:30:00'),
(84, 'Jueves', '19:00:00', '00:30:00'),
(84, 'Viernes', '19:30:00', '02:00:00'),
(84, 'Sábado', '19:30:00', '02:30:00'),
(84, 'Domingo', '18:30:00', '23:00:00'),

(85, 'Martes', '19:00:00', '23:30:00'),
(85, 'Jueves', '19:00:00', '00:30:00'),
(85, 'Viernes', '19:30:00', '02:00:00'),
(85, 'Sábado', '19:30:00', '02:30:00'),
(85, 'Domingo', '18:30:00', '23:00:00'),

(86, 'Miércoles', '19:00:00', '23:30:00'),
(86, 'Jueves', '19:00:00', '00:30:00'),
(86, 'Viernes', '19:30:00', '02:00:00'),
(86, 'Sábado', '19:30:00', '02:30:00'),
(86, 'Domingo', '18:30:00', '23:00:00'),

(87, 'Miércoles', '19:00:00', '23:30:00'),
(87, 'Jueves', '19:00:00', '00:30:00'),
(87, 'Viernes', '19:30:00', '02:00:00'),
(87, 'Sábado', '19:30:00', '02:30:00'),
(87, 'Domingo', '18:30:00', '23:00:00'),

(88, 'Miércoles', '19:00:00', '23:30:00'),
(88, 'Jueves', '19:00:00', '00:30:00'),
(88, 'Viernes', '19:30:00', '02:00:00'),
(88, 'Sábado', '19:30:00', '02:30:00'),
(88, 'Domingo', '18:30:00', '23:00:00'),

(89, 'Miércoles', '19:00:00', '23:30:00'),
(89, 'Jueves', '19:00:00', '00:30:00'),
(89, 'Viernes', '19:30:00', '02:00:00'),
(89, 'Sábado', '19:30:00', '02:30:00'),
(89, 'Domingo', '18:30:00', '23:00:00'),

(90, 'Miércoles', '19:00:00', '23:30:00'),
(90, 'Jueves', '19:00:00', '00:30:00'),
(90, 'Viernes', '19:30:00', '02:00:00'),
(90, 'Sábado', '19:30:00', '02:30:00'),
(90, 'Domingo', '18:30:00', '23:00:00'),

(91, 'Jueves', '20:00:00', '00:00:00'),
(91, 'Viernes', '20:30:00', '01:00:00'),
(91, 'Sábado', '20:30:00', '01:30:00'),
(91, 'Domingo', '20:00:00', '00:00:00'),

(92, 'Jueves', '20:00:00', '00:00:00'),
(92, 'Viernes', '20:30:00', '01:00:00'),
(92, 'Sábado', '20:30:00', '01:30:00'),
(92, 'Domingo', '20:00:00', '00:00:00'),

(93, 'Jueves', '20:00:00', '00:00:00'),
(93, 'Viernes', '20:30:00', '01:00:00'),
(93, 'Sábado', '20:30:00', '01:30:00'),
(93, 'Domingo', '20:00:00', '00:00:00'),

(94, 'Jueves', '20:00:00', '00:00:00'),
(94, 'Viernes', '20:30:00', '01:00:00'),
(94, 'Sábado', '20:30:00', '01:30:00'),
(94, 'Domingo', '20:00:00', '00:00:00'),

(95, 'Jueves', '20:00:00', '00:00:00'),
(95, 'Viernes', '20:30:00', '01:00:00'),
(95, 'Sábado', '20:30:00', '01:30:00'),
(95, 'Domingo', '20:00:00', '00:00:00'),

(96, 'Jueves', '20:00:00', '00:00:00'),
(96, 'Viernes', '20:30:00', '01:00:00'),
(96, 'Sábado', '20:30:00', '01:30:00'),
(96, 'Domingo', '20:00:00', '00:00:00'),

(97, 'Jueves', '20:00:00', '00:00:00'),
(97, 'Viernes', '20:30:00', '01:00:00'),
(97, 'Sábado', '20:30:00', '01:30:00'),
(97, 'Domingo', '20:00:00', '00:00:00'),

(98, 'Jueves', '20:00:00', '00:00:00'),
(98, 'Viernes', '20:30:00', '01:00:00'),
(98, 'Sábado', '20:30:00', '01:30:00'),
(98, 'Domingo', '20:00:00', '00:00:00'),

(99, 'Jueves', '20:00:00', '00:00:00'),
(99, 'Viernes', '20:30:00', '01:00:00'),
(99, 'Sábado', '20:30:00', '01:30:00'),
(99, 'Domingo', '20:00:00', '00:00:00'),

(100, 'Martes', '20:00:00', '23:30:00'),
(100, 'Miércoles', '20:00:00', '23:30:00'),
(100, 'Jueves', '20:00:00', '00:00:00'),
(100, 'Viernes', '20:30:00', '00:30:00'),
(100, 'Sábado', '20:30:00', '01:00:00'),

(101, 'Martes', '20:00:00', '23:30:00'),
(101, 'Miércoles', '20:00:00', '23:30:00'),
(101, 'Jueves', '20:00:00', '00:00:00'),
(101, 'Viernes', '20:30:00', '00:30:00'),
(101, 'Sábado', '20:30:00', '01:00:00'),

(102, 'Martes', '20:00:00', '23:30:00'),
(102, 'Miércoles', '20:00:00', '23:30:00'),
(102, 'Jueves', '20:00:00', '00:00:00'),
(102, 'Viernes', '20:30:00', '00:30:00'),
(102, 'Sábado', '20:30:00', '01:00:00'),

(103, 'Martes', '20:00:00', '23:30:00'),
(103, 'Miércoles', '20:00:00', '23:30:00'),
(103, 'Jueves', '20:00:00', '00:00:00'),
(103, 'Viernes', '20:30:00', '00:30:00'),
(103, 'Sábado', '20:30:00', '01:00:00'),

(104, 'Martes', '20:00:00', '23:30:00'),
(104, 'Miércoles', '20:00:00', '23:30:00'),
(104, 'Jueves', '20:00:00', '00:00:00'),
(104, 'Viernes', '20:30:00', '00:30:00'),
(104, 'Sábado', '20:30:00', '01:00:00'),

(105, 'Martes', '20:00:00', '23:30:00'),
(105, 'Miércoles', '20:00:00', '23:30:00'),
(105, 'Jueves', '20:00:00', '00:00:00'),
(105, 'Viernes', '20:30:00', '00:30:00'),
(105, 'Sábado', '20:30:00', '01:00:00'),

(106, 'Martes', '20:00:00', '23:30:00'),
(106, 'Miércoles', '20:00:00', '23:30:00'),
(106, 'Jueves', '20:00:00', '00:00:00'),
(106, 'Viernes', '20:30:00', '00:30:00'),
(106, 'Sábado', '20:30:00', '01:00:00'),

(107, 'Martes', '20:00:00', '23:30:00'),
(107, 'Miércoles', '20:00:00', '23:30:00'),
(107, 'Jueves', '20:00:00', '00:00:00'),
(107, 'Viernes', '20:30:00', '00:30:00'),
(107, 'Sábado', '20:30:00', '01:00:00'),

(108, 'Jueves', '17:00:00', '22:00:00'),
(108, 'Viernes', '17:00:00', '23:00:00'),
(108, 'Sábado', '16:00:00', '00:00:00'),
(108, 'Domingo', '16:00:00', '21:00:00'),

(109, 'Jueves', '17:00:00', '22:00:00'),
(109, 'Viernes', '17:00:00', '23:00:00'),
(109, 'Sábado', '16:00:00', '00:00:00'),
(109, 'Domingo', '16:00:00', '21:00:00'),

(110, 'Jueves', '17:00:00', '22:00:00'),
(110, 'Viernes', '17:00:00', '23:00:00'),
(110, 'Sábado', '16:00:00', '00:00:00'),
(110, 'Domingo', '16:00:00', '21:00:00'),

(111, 'Miércoles', '18:00:00', '22:30:00'),
(111, 'Jueves', '18:00:00', '23:00:00'),
(111, 'Viernes', '18:00:00', '00:00:00'),
(111, 'Sábado', '17:30:00', '00:30:00'),

(112, 'Miércoles', '18:00:00', '22:30:00'),
(112, 'Jueves', '18:00:00', '23:00:00'),
(112, 'Viernes', '18:00:00', '00:00:00'),
(112, 'Sábado', '17:30:00', '00:30:00'),

(113, 'Lunes', '17:00:00', '22:00:00'),
(113, 'Miércoles', '17:00:00', '23:00:00'),
(113, 'Viernes', '18:00:00', '01:00:00'),
(113, 'Sábado', '18:00:00', '01:30:00'),
(113, 'Domingo', '17:00:00', '23:00:00'),

(114, 'Lunes', '17:00:00', '22:00:00'),
(114, 'Miércoles', '17:00:00', '23:00:00'),
(114, 'Viernes', '18:00:00', '01:00:00'),
(114, 'Sábado', '18:00:00', '01:30:00'),
(114, 'Domingo', '17:00:00', '23:00:00'),

(115, 'Lunes', '17:00:00', '22:00:00'),
(115, 'Miércoles', '17:00:00', '23:00:00'),
(115, 'Viernes', '18:00:00', '01:00:00'),
(115, 'Sábado', '18:00:00', '01:30:00'),
(115, 'Domingo', '17:00:00', '23:00:00'),

(116, 'Lunes', '17:00:00', '22:00:00'),
(116, 'Miércoles', '17:00:00', '23:00:00'),
(116, 'Viernes', '18:00:00', '01:00:00'),
(116, 'Sábado', '18:00:00', '01:30:00'),
(116, 'Domingo', '17:00:00', '23:00:00'),

(118, 'Miércoles', '17:00:00', '21:00:00'),
(118, 'Jueves', '17:00:00', '22:00:00'),
(118, 'Viernes', '17:00:00', '23:00:00'),
(118, 'Sábado', '16:00:00', '23:30:00'),
(118, 'Domingo', '16:00:00', '21:00:00'),

(119, 'Miércoles', '17:00:00', '21:00:00'),
(119, 'Jueves', '17:00:00', '22:00:00'),
(119, 'Viernes', '17:00:00', '23:00:00'),
(119, 'Sábado', '16:00:00', '23:30:00'),
(119, 'Domingo', '16:00:00', '21:00:00'),

(120, 'Miércoles', '17:00:00', '21:00:00'),
(120, 'Jueves', '17:00:00', '22:00:00'),
(120, 'Viernes', '17:00:00', '23:00:00'),
(120, 'Sábado', '16:00:00', '23:30:00'),
(120, 'Domingo', '16:00:00', '21:00:00'),

(121, 'Jueves', '20:00:00', '01:00:00'),
(121, 'Viernes', '20:30:00', '02:00:00'),
(121, 'Sábado', '20:30:00', '02:30:00'),
(121, 'Domingo', '20:00:00', '00:30:00'),

(122, 'Jueves', '20:00:00', '01:00:00'),
(122, 'Viernes', '20:30:00', '02:00:00'),
(122, 'Sábado', '20:30:00', '02:30:00'),
(122, 'Domingo', '20:00:00', '00:30:00'),

(123, 'Jueves', '20:00:00', '01:00:00'),
(123, 'Viernes', '20:30:00', '02:00:00'),
(123, 'Sábado', '20:30:00', '02:30:00'),
(123, 'Domingo', '20:00:00', '00:30:00'),

(124, 'Jueves', '20:00:00', '01:00:00'),
(124, 'Viernes', '20:30:00', '02:00:00'),
(124, 'Sábado', '20:30:00', '02:30:00'),
(124, 'Domingo', '20:00:00', '00:30:00'),

(125, 'Jueves', '20:00:00', '01:00:00'),
(125, 'Viernes', '20:30:00', '02:00:00'),
(125, 'Sábado', '20:30:00', '02:30:00'),
(125, 'Domingo', '20:00:00', '00:30:00'),

(126, 'Jueves', '20:00:00', '01:00:00'),
(126, 'Viernes', '20:30:00', '02:00:00'),
(126, 'Sábado', '20:30:00', '02:30:00'),
(126, 'Domingo', '20:00:00', '00:30:00'),

(127, 'Jueves', '20:00:00', '01:00:00'),
(127, 'Viernes', '20:30:00', '02:00:00'),
(127, 'Sábado', '20:30:00', '02:30:00'),
(127, 'Domingo', '20:00:00', '00:30:00'),

(128, 'Jueves', '20:00:00', '01:00:00'),
(128, 'Viernes', '20:30:00', '02:00:00'),
(128, 'Sábado', '20:30:00', '02:30:00'),
(128, 'Domingo', '20:00:00', '00:30:00'),

(129, 'Miércoles', '19:30:00', '22:30:00'),
(129, 'Jueves', '20:00:00', '23:00:00'),
(129, 'Viernes', '20:00:00', '23:30:00'),
(129, 'Sábado', '18:30:00', '23:30:00'),
(129, 'Domingo', '18:00:00', '22:00:00'),

(130, 'Miércoles', '19:30:00', '22:30:00'),
(130, 'Jueves', '20:00:00', '23:00:00'),
(130, 'Viernes', '20:00:00', '23:30:00'),
(130, 'Sábado', '18:30:00', '23:30:00'),
(130, 'Domingo', '18:00:00', '22:00:00'),

(131, 'Miércoles', '19:30:00', '22:30:00'),
(131, 'Jueves', '20:00:00', '23:00:00'),
(131, 'Viernes', '20:00:00', '23:30:00'),
(131, 'Sábado', '18:30:00', '23:30:00'),
(131, 'Domingo', '18:00:00', '22:00:00'),

(132, 'Miércoles', '19:30:00', '22:30:00'),
(132, 'Jueves', '20:00:00', '23:00:00'),
(132, 'Viernes', '20:00:00', '23:30:00'),
(132, 'Sábado', '18:30:00', '23:30:00'),
(132, 'Domingo', '18:00:00', '22:00:00'),

(133, 'Miércoles', '19:30:00', '22:30:00'),
(133, 'Jueves', '20:00:00', '23:00:00'),
(133, 'Viernes', '20:00:00', '23:30:00'),
(133, 'Sábado', '18:30:00', '23:30:00'),
(133, 'Domingo', '18:00:00', '22:00:00');