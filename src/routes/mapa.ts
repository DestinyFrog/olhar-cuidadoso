import { Router } from "express"
import Log from "../util/log.js"
import { PrismaClient } from "@prisma/client"
import { getMapData } from "../models/locals.js"

const router = Router()

router.get("/", async (req, res) => {
	const prisma = new PrismaClient()

	getMapData()
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({
				mensagem:"Erro na query SQL"})
	})

	prisma.$disconnect()
})

export default router