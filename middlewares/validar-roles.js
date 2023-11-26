import { response } from 'express'

export const esAdminRole = (req, res = response, next) => {
	// Se puede usar el req.usuario porque otro
	// Middleware que iba antes ya lo creo
	if (!req.usuario) {
		// 500 Internal Server Error
		return res.status(500).json({
			message:
				'Se quiere verificar el rol sin validar el Token primero. Verifica los Middlewares'
		})
	}

	const { rol, nombre } = req.usuario

	if (rol !== 'ADMIN_ROLE') {
		// 401 Unhautorized
		return res.status(401).json({
			message: `${nombre} No es Administrador! - No puede hacer esto.`
		})
	}

	next()
}

export const tieneRole = (...roles) => {
	// Operador rest convierte los argumentos en array

	return (req, res = response, next) => {
		if (!req.usuario) {
			// 500 Internal Server Error
			return res.status(500).json({
				message:
					'Se quiere verificar el rol sin validar el Token primero. Verifica los Middlewares'
			})
		}

		if (!roles.includes(req.usuario.rol)) {
			// 401 Unhautorized
			return res.status(401).json({
				message: `El servicio require uno de estos roles: ${roles}`
			})
		}

		next()
	}
}
