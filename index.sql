-- Down
DROP TABLE IF EXISTS `casos_de_dengue`;
DROP TABLE IF EXISTS `posto_de_saude`;
DROP TABLE IF EXISTS `bairro`;
DROP TABLE IF EXISTS `alerta`;
DROP TABLE IF EXISTS `cidade`;
DROP TABLE IF EXISTS `usuario`;
--

-- UP
CREATE TABLE `usuario`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `senha` VARCHAR(255) NOT NULL
);

CREATE TABLE `cidade`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `xpos` DOUBLE NOT NULL,
    `ypos` DOUBLE NOT NULL
);

CREATE TABLE `alerta`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `foto` BLOB NOT NULL,
    `xpos` DOUBLE NOT NULL,
    `ypos` DOUBLE NOT NULL,
    `aprovacoes` INT NOT NULL,
    `desaprovacoes` BIGINT NOT NULL,
    `id_usuario` BIGINT UNSIGNED NOT NULL,

	FOREIGN KEY(`id_usuario`) REFERENCES `usuario`(`id`)
);

CREATE TABLE `bairro`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `id_cidade` BIGINT UNSIGNED NOT NULL,
    `xpos` DOUBLE NOT NULL,
    `ypos` DOUBLE NOT NULL,

	FOREIGN KEY(`id_cidade`) REFERENCES `cidade`(`id`)
);

CREATE TABLE `posto_de_saude`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `id_bairro` BIGINT UNSIGNED NOT NULL,
    `xpos` DOUBLE NOT NULL,
    `ypos` DOUBLE NOT NULL,
    `telefone` VARCHAR(13) NOT NULL,
    `endereço` VARCHAR(560) NOT NULL,

	FOREIGN KEY(`id_bairro`) REFERENCES `bairro`(`id`)
);

CREATE TABLE `casos_de_dengue`(
	`id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `id_posto_de_saude` BIGINT UNSIGNED NOT NULL,
	`casos` BIGINT UNSIGNED,
	`incidencia` FLOAT,

	FOREIGN KEY(`id_posto_de_saude`) REFERENCES `posto_de_saude`(`id`)
);
--

-- POPULATE
INSERT INTO `usuario` (nome, email, senha)
VALUES
    ('calisto', 'pedrocalizto9@gmail.com', 'teract');

INSERT INTO `cidade` (nome, xpos, ypos)
VALUES
    ('Guarulhos', -23.435914, -46.484482);

INSERT INTO `bairro` (id_cidade, nome, xpos, ypos)
VALUES
    (1, 'Jardim São João', -23.409565, -46.454261),
    (1, 'Maia', -23.454270, -46.530782),
    (1, 'Centro', -23.467990, -46.531125),
    (1, 'Taboão', -23.425190, -46.500556),
    (1, 'Jardim Bom Clima', -23.451345, -46.518393),
    (1, 'Jardim Presidente Dutra', -23.425769, -46.432768);

INSERT INTO `posto_de_saude` (id_bairro, nome, xpos, ypos, telefone, endereço)
VALUES
    (1, 'UBS soberana', -23.402577, -46.446879, '551122292240', 'Estrada Guarulhos-Nazaré, 730 - São João, Guarulhos - SP, 07162-370'),
	(1, 'UBS seródio', -23.417192087070312, -46.45716961432221, '551124679598', 'Av. Coqueiral, 111 - Cidade Serodio, Guarulhos - SP, 07150-260');

INSERT INTO `casos_de_dengue` (id_posto_de_saude, casos, incidencia)
VALUES
	(1, 1515, 5632.2),
	(1, 1131, 4209.8);
--