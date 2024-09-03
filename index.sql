-- Down
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
    `email` VARCHAR(255) NOT NULL,
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
    (5, 'HMU - Hospital Municipal de Urgências', -23.452886, -46.516211, '551124757422', 'Av. Tiradentes, 3392 - Jardim Bom Clima, Guarulhos - SP, 07196-000'),
    (1, 'UPA São João/Lavras', -23.402577, -46.446879, '551122292240', 'Estrada Guarulhos-Nazaré, 730 - São João, Guarulhos - SP, 07162-370');
--