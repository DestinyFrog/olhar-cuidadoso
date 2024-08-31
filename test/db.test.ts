import { describe, test, expect} from '@jest/globals'
import { OpenConnection } from '../src/db/conn'
import { sql } from 'drizzle-orm'
import { config } from 'dotenv'

config()

describe("Acesso ao MySQL", () => {
	test("ping", async () => {
		const db = await OpenConnection()
		const data = await db.execute(sql`select 1`)
		expect(data[1][0]?.name == '1')
	})
})
