import { Router } from 'express'
import { check } from 'express-validator'

import {
	usuariosGet,
	usuariosPost,
	usuariosDelete,
	usuariosPatch,
	usuariosPut
} from '../controllers/usuarios.controller.js'

import {
	esRoleValido,
	emailExiste,
	usuarioExisteid
} from '../helpers/db-validators.js'

import {
	validarCampos,
	validarJWT,
	esAdminRole,
	tieneRole
} from '../middlewares/index.js'

const router = Router()

router.get('/', usuariosGet)

router.put(
	'/:id',
	[
		check('id', 'No es un ID valido').isMongoId(),
		check('id').custom(usuarioExisteid),
		validarCampos
	],
	usuariosPut
)

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(), // Validacion del nombre
		check('correo', 'El correo no es valido').isEmail(), // Validacion del Email
		check('correo').custom(emailExiste),
		check(
			'password',
			'La password es obligatoria y debe tener mas de 6 caracteres'
		)
			.isLength({ min: 6 })
			.not()
			.isEmpty(), // Validacion de Password
		// check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
		check('rol').custom(esRoleValido),
		validarCampos
	],
	usuariosPost
)

router.patch('/', usuariosPatch)

router.delete(
	'/:id',
	[
		validarJWT,
		// esAdminRole,
		tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
		check('id', 'No es un ID válido').isMongoId(),
		check('id').custom(usuarioExisteid),
		validarCampos
	],
	usuariosDelete
)

export default router
