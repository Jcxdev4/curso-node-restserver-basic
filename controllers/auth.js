import { response } from 'express'
import Usuario from '../models/usuario.js'
import bcrypt from 'bcrypt'
import { generarJWT } from '../helpers/generar-jwt.js'

const login = async (req, res = response) => {
	const { correo, password } = req.body

	try {
		// Verificar si email existe
		const usuario = await Usuario.findOne({ correo })

		if (!usuario) {
			return res.status(400).json({
				message: 'Usuario / Password no son correctos - correo'
			})
		}
		// Verificar si el usuario esta activo
		if (!usuario.estado) {
			return res.status(400).json({
				message: 'Usuario / Password no son correctos - estado: false'
			})
		}

		//Verificar la contraseña
		const validPassword = bcrypt.compareSync(password, usuario.password)
		if (!validPassword) {
			return res.status(400).json({
				message: 'Usuario / Password no son correctos - password'
			})
		}

		// Generar el JWT
		const token = await generarJWT(usuario.id, usuario.nombre)

		res.json({ usuario, token })
	} catch (e) {
		console.log(e)
		return res
			.status(500)
			.json({ message: 'Algo salio mal!, contactese con el administrador.' })
	}
}

export { login }
