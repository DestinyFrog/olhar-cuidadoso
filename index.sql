--@block Down
DROP TABLE IF EXISTS `posto_de_saude`;
DROP TABLE IF EXISTS `bairro`;
DROP TABLE IF EXISTS `alerta`;
DROP TABLE IF EXISTS `cidade`;
DROP TABLE IF EXISTS `usuario`;
--

--@block UP
CREATE TABLE `usuario`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL
);

CREATE TABLE `cidade`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL
);

CREATE TABLE `alerta`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `foto` BLOB NOT NULL,
    `xpos` BIGINT NOT NULL,
    `ypos` BIGINT NOT NULL,
    `aprovacoes` INT NOT NULL,
    `desaprovacoes` BIGINT NOT NULL,
    `id_usuario` BIGINT UNSIGNED NOT NULL,

	FOREIGN KEY(`id_usuario`) REFERENCES `usuario`(`id`)
);

CREATE TABLE `bairro`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `id_cidade` BIGINT UNSIGNED NOT NULL,
    `xpos` BIGINT NOT NULL,
    `ypos` BIGINT NOT NULL,

	FOREIGN KEY(`id_cidade`) REFERENCES `cidade`(`id`)
);

CREATE TABLE `posto_de_saude`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `id_bairro` BIGINT UNSIGNED NOT NULL,
    `telefone` VARCHAR(13) NOT NULL,
    `endereço` VARCHAR(255) NOT NULL,

	FOREIGN KEY(`id_bairro`) REFERENCES `bairro`(`id`)
);
--