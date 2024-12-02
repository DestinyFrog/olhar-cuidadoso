import Express from 'express'
import prisma from '../db/db.js'
import jwt from 'jsonwebtoken'
import Log from '../util/log.js'

const router = Express.Router()

router.get("/all", (req, res) => {

	prisma.alerta.findMany()
	.then(data => {
		res
			.json(data)
	})
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({mensagem:"Erro na query SQL"})
	})

})

router.post("/", (req, res) => {
	const token = req.body["token"]

	if (!token) {
		res	
			.status(400)
			.json({mensagem: "token inválido"})
		return
	}

	const processedToken = jwt.verify(token, process.env.SECRET)

	prisma.alerta.findMany({
		where: {
			id: processedToken["id"]
		}
	})
	.then(data => {
		res
			.json(data)
	})
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({mensagem:"Erro na query SQL"})
	})

})

router.post("/postar", (req, res) => {
	const token = req.body["token"]

	if (!token) {
		res	
			.status(400)
			.json({mensagem: "token inválido"})
		return
	}

	const processedToken = jwt.verify(token, process.env.SECRET)

	const body = {
		nome: req.body["nome"],
		xpos: req.body["xpos"],
		ypos: req.body["ypos"],
		idUsuario: processedToken["id"]
	}
	
	prisma.alerta.create({
		data: body
	})
	.then(data => {
		res
			.json(data)
	})
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({mensagem:"Erro na query SQL"})
	})
})

export default router