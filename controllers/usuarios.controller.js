const { request, response } = require('express')

const usuariosGet = (req = request, res = response) => {
  const { saludo, persona, apikey, page = 1, limit = 5 } = req.query
  res.json({
    message: 'GET API - controlador',
    saludo,
    persona,
    apikey,
    page,
    limit
  })
}

const usuariosPost = (req = request, res = response) => {
  const { nombre, edad, app } = req.body

  res.json({
    message: 'POST API - controlador',
    nombre,
    edad,
    app
  })
}

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params

  res.json({
    message: 'PUT API - controlador',
    id
  })
}

const usuariosPatch = (req = request, res = response) => {
  res.json({
    message: 'PATCH API - controlador'
  })
}

const usuariosDelete = (req = request, res = response) => {
  res.json({
    message: 'DELETE API - controlador'
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
