import { Router } from "express"
import Log from "../util/log.js"
import { PrismaClient } from "@prisma/client"

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

	const prisma = new PrismaClient()

	prisma.usuario.findFirst( { where: { email } } )
	.then(data => {
		if (data) {
			if (senha == data.senha) {
				res.cookie("id_user", data.id)
					.json({mensagem:"Sucesso"})
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
			.json({
				mensagem:"Erro na query SQL"})
	})

	prisma.$disconnect()
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

	const prisma = new PrismaClient()

	prisma.usuario.create( {
		data: {
			nome, email, senha: senha }
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