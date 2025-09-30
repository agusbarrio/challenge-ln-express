CREATE TABLE IF NOT EXISTS `productos` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `sku` varchar(255),
  `descripcion_corta` varchar(255),
  `descripcion_larga` varchar(255),
  `qty` integer,
  `ubicacion_imagen` varchar(255),
  `producto_tipo_id` integer NOT NULL,
  `producto_categoria_id` integer NOT NULL,
  `producto_estado_id` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `producto_estado` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `descripcion` varchar(255)
);

CREATE TABLE IF NOT EXISTS `lista_precios` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `precio` decimal,
  `fecha_desde` timestamp,
  `fecha_hasta` timestamp,
  `producto_id` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `producto_tipo` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `codigo` varchar(255),
  `descripcion` varchar(255)
);

CREATE TABLE IF NOT EXISTS `producto_categoria` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `codigo` varchar(255),
  `descripcion` varchar(255)
);

CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `fecha_circulacion` timestamp,
  `precio` decimal,
  `clase_entrega` varchar(255),
  `condicion_pago_aplicada` varchar(255),
  `id_cliente` varchar(255),
  `producto_id` integer NOT NULL,
  `cliente_id` integer NOT NULL,
  `cantidad_solicitada` integer
);

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255),
  `apellido` varchar(255),
  `domicilio` varchar(255),
  `cuit` varchar(255)
);

ALTER TABLE `productos` ADD FOREIGN KEY (`producto_estado_id`) REFERENCES `producto_estado` (`id`);

ALTER TABLE `productos` ADD FOREIGN KEY (`producto_tipo_id`) REFERENCES `producto_tipo` (`id`);

ALTER TABLE `lista_precios` ADD FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

ALTER TABLE `productos` ADD FOREIGN KEY (`producto_categoria_id`) REFERENCES `producto_categoria` (`id`);

ALTER TABLE `pedidos` ADD FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

ALTER TABLE `pedidos` ADD FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);


-- Usuarios

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL
);