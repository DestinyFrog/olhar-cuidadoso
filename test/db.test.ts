import { describe, test, expect, beforeAll } from '@jest/globals'
import { OpenConnection } from '../src/db/conn'
import { usuarios } from '../src/db/tables'
import { eq, sql } from 'drizzle-orm'
import { config } from 'dotenv'

beforeAll(() => {
	config()
})

describe("Acesso ao MySQL", () => {
	test("ping", async () => {
		OpenConnection()
		.then(db => {
			db.execute(sql`select 1`)
			.then(data => {
				expect(data[1][0]?.name).toEqual('1')
			})
		})
	})
})

describe("Tabela 'usuario'", () => {
	test("CREATE", () => {
		OpenConnection()
		.then(db => {
			db.insert(usuarios).values( {
				nome: "teste_nome",
				email: "teste_email@email.com",
				senha: "teste_senha"
			} )
		})
	})

	test("READ", async () => {
		OpenConnection()
		.then(db => {
			db.select().from(usuarios).where(eq(usuarios.nome, 'teste_nome'))
			.then(data => {
				expect(data.length).toBeGreaterThan(0)
				expect(data[0]?.nome).toEqual('teste_nome')
				expect(data[0]?.email).toEqual('teste_email@email.com')
				expect(data[0]?.senha).toEqual('teste_senha')
			})
		})
	})

	test("UPDATE", async () => {
		OpenConnection()
		.then(db => {
			db.update(usuarios).set({
				email: 'teste_outro_email@email.com',
				senha: 'teste_outra_senha',
			}).where(eq(usuarios.nome, 'teste_nome'))
			.then(_ => {
				db.select().from(usuarios).where(eq(usuarios.nome, 'teste_nome')).then(data => {
					expect(data.length > 0).toBeTruthy()
					expect(data[0]?.email).toEqual('teste_outro_email@email.com')
					expect(data[0]?.senha).toEqual('teste_outra_senha')
				})
			})
		})
	})

	test("DELETE", async () => {
		OpenConnection()
		.then(db => {
			db.delete(usuarios).where(eq(usuarios.nome, 'teste_nome'))
			.then(_ => {
				db.select().from(usuarios).where(eq(usuarios.nome, 'teste_nome'))
				.then(data => {
					expect(data.length).toEqual(0)
				})
			})
		})
	})
})