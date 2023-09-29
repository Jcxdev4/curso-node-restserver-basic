const {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
} = require('../controllers/usuarios.controller')

const {Router} = require('express')

const router = Router()

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', usuariosPost)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)

module.exports = router
