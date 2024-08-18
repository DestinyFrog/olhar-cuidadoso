import { bigint, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const usuarios = mysqlTable('usuario', {
	id: serial('id').primaryKey(),
	nome: varchar('nome', { length: 256 }),
	email: varchar('email', { length: 256 }),
	senha: varchar('senha', { length: 256 })
})

export const cidades = mysqlTable('cidade', {
	id: serial('id').primaryKey(),
	nome: varchar('nome', { length: 256 })
})

export const alertas = mysqlTable('alerta', {
	id: serial('id').primaryKey(),
	foto: bigint('foto', {mode: "bigint"}),
	xpos: int('xpos', {}),
	ypos: int('ypos', {}),
	aprovacoes: int('aprovacoes', {}),
	desaprovacoes: int('desaprovacoes', {}),
	id_usuario: int('id_usuario').references(() => usuarios.id)
})

export const bairros = mysqlTable('bairro', {
	id: serial('id').primaryKey(),
	nome: varchar('nome', { length: 256 }),
	xpos: int('xpos', {}),
	ypos: int('ypos', {}),
	id_cidade: int('id_cidade').references(() => cidades.id)
})

export const postos_de_saude = mysqlTable('posto_de_saude', {
	id: serial('id').primaryKey(),
	nome: varchar('nome', { length: 256 }),
	telefone: varchar('telefone', { length: 14 }),
	endereco: varchar('endereço', { length: 256 }),
	id_bairro: int('id_bairro').references(() => bairros.id)
})