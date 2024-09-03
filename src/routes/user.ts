import { Router } from "express"
import { OpenConnection, OpenPool } from "../db/conn.js"
import { usuarios } from "../db/tables.js"
import Log from "../util/log.js"
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

	OpenPool()
	.select()
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
})

export default router