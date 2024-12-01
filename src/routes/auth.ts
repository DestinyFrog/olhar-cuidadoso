import { Router } from 'express'
import Log from '../util/log.js'
import prisma from '../db/db.js'
import jwt from 'jsonwebtoken'

const router = Router()

router.post("/login", async (req, res) => {
	const email: string = req.body["email"]
	const senha: string = req.body["senha"]

	if (!email) {
		res.status(400)
			.json({"mensagem":"Email não é valido"})
		return
	}

	if (!senha) {
		res.status(400)
			.json({"mensagem":"Senha não é válida"})
		return
	}

	prisma.usuario.findFirst( { where: { email } } )
	.then(data => {
		if (data) {
			if (senha == data.senha) {
				const token = jwt.sign( {id: data.id} , process.env.SECRET )
				res.json({ token })
			} else {
				res.status(203)
					.json({mensagem:"Senha Incorreta"})
			}
		} else
			res.status(404)
				.json({mensagem:"Usuario não encontrado"})
	})
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({mensagem:"Erro na query SQL"})
	})
})

router.post("/signin", async (req, res) => {
	const nome: string = req.body["nome"]
	const email: string = req.body["email"]
	const senha: string = req.body["senha"]

	if (!nome) {
		res.status(400)
			.json({"mensagem":"Nome não é valido"})
		return
	}

	if (!email) {
		res.status(400)
			.json({"mensagem":"Email não é valido"})
		return
	}

	if (!senha) {
		res.status(400)
			.json({"mensagem":"Senha não é válida"})
		return
	}

	prisma.usuario.create( {
		data: { nome, email, senha }
	} )
	.then(data => {
		res.cookie("id_user", data.id)
			.json({mensagem:"Sucesso"})
	})
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({
				mensagem:"Erro na query SQL",
				erro: err
			})
	})

	prisma.$disconnect()
})

export default router