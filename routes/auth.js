import { Router } from 'express'
import { login } from '../controllers/auth.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'

const router = Router()

router.post(
	'/login',
	[check('correo', 'El correo es Obligatorio').isEmail(), validarCampos],
	login
)

export default router
