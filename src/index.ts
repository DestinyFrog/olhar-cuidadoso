import {config} from 'dotenv'
import Express from 'express'

import UsuarioRouter from './routes/user'
import Log from './util/log'

config()
Log.Clear()

const app = Express()
app.use(Express.json())

app.use(Express.static("src/public") )
app.use("/api/v1/usuario", UsuarioRouter )

const PORT = process.env['SERVER_PORT'] || 3000
app.listen(PORT, () =>
	console.log(`Listening on http://localhost:${PORT}/`) )