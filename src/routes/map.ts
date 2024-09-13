import { Router } from "express"
import { getMapData } from "../db/models.js"
import Log from "../util/log.js"

const router = Router()

router.get("/", async (req, res) => {
	try {
		const data = await getMapData()
		res.json(data)
	}
	catch (err) {
		Log.Write(<Error> err)
		res.status(500)
			.json({"mensagem":"Erro na query SQL"})
	}
})

export default router