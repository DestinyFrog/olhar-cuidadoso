import {config} from 'dotenv'
import { OpenConnection } from './db/conn.js'
import { cidades, usuarios } from './db/tables.js'

( async () => {
	config()
	const db = await OpenConnection()

	const new_user = {
		nome: "Calisto",
		email: "pedrocalizto9@gmail.com",
		senha: "teract"
	}

	await db.insert(usuarios).values(new_user)
	const data = await db.select().from(usuarios)
	console.log(data)
} )
.call(this)