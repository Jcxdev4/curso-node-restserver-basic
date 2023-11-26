import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.js'

export const validarJWT = async (req = request, res = response, next) => {
	const token = req.header('x-key')

	if (!token) {
		return res.status(401).json({
			message: 'No hay token en la peticion'
		})
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

		// Leer el usuario que corresponde al uid
		const usuario = await Usuario.findById(uid)

		if (!usuario) {
			return res.status(400).json({
				message: 'Usuario no encontrado en BD!! Revisa e intenta nuevamente,'
			})
		}

		// Verificar si el usuario tiene estado true
		if (!usuario.estado) {
			return res.status(401).json({
				message: 'Usuario no permitido - estado: false'
			})
		}

		req.usuario = usuario
		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({
			message: 'Token no valido'
		})
	}
}
