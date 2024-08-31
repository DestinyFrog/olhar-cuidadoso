import { Router } from "express"
import { OpenConnection } from "../db/conn"
import { usuarios } from "../db/tables"
import Log from "../util/log"
import { sql } from "drizzle-orm"

const router = Router()

router.post("/login", async (req, res) => {
	const email = req.body["email"]
	const password = req.body["password"]

	if (!email) {
		res.status(400)
			.json({"mensagem":"Email não é valido"})
		return
	}

	if (!password) {
		res.status(400)
			.json({"mensagem":"Senha não é válida"})
		return
	}

	OpenConnection()
	.then( db => {
		db.select()
			.from(usuarios)
			.where(sql`${usuarios.email} = ${email}`)
			.then(([data]) => {
				if (data) {
					if (password == data.senha) {
						res.cookie("id_user", data.id)
							.json({"mensagem":"Sucesso"})
					} else {
						res.status(203)
							.json({"mensagem":"Senha Incorreta"})
					}
				} else {
					res.status(203)
						.json({"mensagem":"Usuario não encontrado"})
				}
			})
			.catch(err => {
				Log.Write(err)
				res.status(500)
					.json({"mensagem":"Erro na query SQL"})
			})
	} )
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({"mensagem":"Erro ao acessar o banco de dados"})
	})
})

router.get("/", async (req, res) => {
	OpenConnection()
	.then( db => {
		db.select().from(usuarios)
			.then(data => {
				res.status(200)
					.json(data)
			})
			.catch(err => {
				Log.Write(err)
				res.status(500)
					.json({"mensagem":"Error acessing user database"})
			})
	} )
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({"mensagem":"Error opening database"})
	})
})

export default router