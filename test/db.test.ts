import { describe, test, expect, afterAll } from '@jest/globals'
import { OpenConnection } from '../src/db/conn'
import { usuarios } from '../src/db/tables'
import { eq, sql } from 'drizzle-orm'
import { config } from 'dotenv'

config()

afterAll(done => done())

describe("Acesso ao MySQL", () => {
	test("ping", async () => {
		const db = await OpenConnection()
		const data = await db.execute(sql`select 1`)
		expect(data[1][0]?.name == '1')
	})
})

describe("Tabela 'usuario'", () => {
	test("CREATE", async () => {
		const db = await OpenConnection()
		await db.insert(usuarios).values( {
			nome: "teste_nome",
			email: "teste_email@email.com",
			senha: "teste_senha"
		} )
	})

	test("READ", async () => {
		const db = await OpenConnection()
		const data = await db.select().from(usuarios).where(eq(usuarios.nome, 'teste_nome'))
		expect(data.length > 0).toBeTruthy()
		expect(data[0]?.nome == 'teste_nome').toBeTruthy()
		expect(data[0]?.email == 'teste_email@email.com').toBeTruthy()
		expect(data[0]?.senha == 'teste_senha').toBeTruthy()
	})

	test("UPDATE", async () => {
		const db = await OpenConnection()
		await db.update(usuarios).set({
			email: 'teste_outro_email@email.com',
			senha: 'teste_outra_senha',
		}).where(eq(usuarios.nome, 'teste_nome'))
		
		const data = await db.select().from(usuarios).where(eq(usuarios.nome, 'teste_nome'))
		expect(data.length > 0).toBeTruthy()
		expect(data[0]?.email == 'teste_outro_email@email.com').toBeTruthy()
		expect(data[0]?.senha == 'teste_outra_senha').toBeTruthy()
	})

	test("DELETE", async () => {
		const db = await OpenConnection()
		await db.delete(usuarios).where(eq(usuarios.nome, 'teste_nome'))

		const data = await db.select().from(usuarios).where(eq(usuarios.nome, 'teste_nome'))
		expect(data.length == 0).toBeTruthy()
	})
})
