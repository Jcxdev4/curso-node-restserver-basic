const express = require('express')
const cors = require('cors')

class Server {
  constructor() {
    // Express configuration
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'

    // MidleWares
    this.middlewares()
    this.routes()

    // Desactivar header de Express
    this.app.disable('x-powered-by')
  }

  middlewares() {
    // CORS
    this.app.use(cors())
    // Lectura y parseo del body
    this.app.use(express.json())
    // Directorio Publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
