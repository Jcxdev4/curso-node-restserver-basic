import express from 'express'
import cors from 'cors'
import { dbConnection } from '../database/config.js'

class Server {
	constructor() {
		// Express configuration
		this.app = express()
		this.port = process.env.PORT
		this.usuariosPath = '/api/usuarios'
		this.authPath = '/api/auth'

		// Conectar base de datos
		this.conectarDB()

		// MidleWares
		this.middlewares()
		this.routes()

		// Desactivar header de Express
		this.app.disable('x-powered-by')
	}

	async conectarDB() {
		await dbConnection()
	}

	middlewares() {
		// CORS
		this.app.use(cors())
		// Lectura y parseo del body
		this.app.use(express.json())
		// Directorio Publico
		this.app.use(express.static('public'))
	}

	async routes() {
		const authRoutes = await import('../routes/auth.js')
		const usuariosRoutes = await import('../routes/usuarios.js')
		this.app.use(this.authPath, authRoutes.default)
		this.app.use(this.usuariosPath, usuariosRoutes.default)
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Example app listening at http://localhost:${this.port}`)
		})
	}
}

export default Server
