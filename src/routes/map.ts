import { Router } from "express"
import { OpenPool } from "../db/conn.js"
import { bairros, cidades } from "../db/tables.js"
import Log from "../util/log.js"
import { eq } from "drizzle-orm"

const router = Router()

router.get("/", (req, res) => {
    OpenPool()
	.select()
	.from(cidades)
    .leftJoin(bairros, eq(bairros.id_cidade, cidades.id))
	.then(rows => {
        let data: Record<number, { cidade: typeof cidades.$inferSelect; bairros: typeof bairros.$inferSelect}>

        data = rows.reduce<any>((acc:any[], {bairro, cidade}) => {
            if (acc[cidade.id])
                acc[cidade.id].bairros.push(bairro)
            else
                acc[cidade.id] = { ... cidade, bairros: [bairro] }
            return acc
        }, []).filter((d:any) => d != null)
    
		res.status(200)
            .json(data)
	})
	.catch(err => {
		Log.Write(err)
		res.status(500)
			.json({"mensagem":"Erro na query SQL"})
	})
})

export default router