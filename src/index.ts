import {config} from 'dotenv'
import Express from 'express'

import UsuarioRouter from './routes/user.js'
import Log from './util/log.js'

config()
Log.Text("Start", "")

const app = Express()
app.use(Express.json())

app.use("/", Express.static("../public") )
app.use("/api/v1/usuario", UsuarioRouter )

app.get("/ping", (req, res) =>
	res.end("Hello, World!!"))

const PORT = process.env['SERVER_PORT'] || 3000
app.listen(PORT, () =>
	console.log(`Listening on http://localhost:${PORT}/`) )