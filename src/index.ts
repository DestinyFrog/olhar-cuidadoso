import {config} from 'dotenv'
import Express from 'express'

import UsuarioRouter from './routes/auth.js'
import MapaRouter from './routes/mapa.js'
import ComentarioRouter from './routes/comentario.js'
import Log from './util/log.js'
import path from 'path'
import { fileURLToPath } from 'url'

config()
Log.Text("Start", "")

const app = Express()
app.use(Express.json())

app.use("/", Express.static( path.join( path.dirname(fileURLToPath(import.meta.url)), '..', 'public') ) )

app.use("/api/v1/auth", UsuarioRouter )
app.use("/api/v1/map", MapaRouter )
app.use("/api/v1/comentario", ComentarioRouter )

app.get("/ping", (req, res) =>
	res.end("Hello, World!!"))

const PORT = process.env['SERVER_PORT'] || 3000
app.listen(PORT, () =>
	console.log(`Listening on http://localhost:${PORT}/`) )