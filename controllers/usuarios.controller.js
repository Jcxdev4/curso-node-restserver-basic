import bcrypt from 'bcrypt'
import { request, response } from 'express'
import Usuario from '../models/usuario.js'

const usuariosGet = async (req = request, res = response) => {
	// const { saludo, persona, apikey, page = 1, limit = 5 } = req.query

	const { limite = 10, desde = 0 } = req.query // esto viene como un string
	const query = { estado: true }

	// const usuarios = await Usuario.find(query)
	//   .limit(Number(limite))
	//   .skip(Number(desde))

	// const total = await Usuario.countDocuments(query)

	const [usuarios, total] = await Promise.all([
		Usuario.find(query).limit(Number(limite)).skip(Number(desde)),
		Usuario.countDocuments(query)
	])

	res.json({
		total,
		usuarios
	})
}

const usuariosPost = async (req = request, res = response) => {
	const { nombre, correo, password, rol } = req.body
	const usuario = new Usuario({ nombre, correo, password, rol })

	//Encryptar la contraseña
	const salt = bcrypt.genSaltSync()
	usuario.password = bcrypt.hashSync(password, salt)

	await usuario.save()

	res.json({
		usuario
	})
}

const usuariosPut = async (req = request, res = response) => {
	const { id } = req.params
	const { _id, password, google, correo, ...resto } = req.body

	// Validar contra la base datos
	if (password) {
		//Encryptar la contraseña
		const salt = bcrypt.genSaltSync()
		resto.password = bcrypt.hashSync(password, salt)
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto)

	res.json({
		usuario
	})
}

const usuariosPatch = (req = request, res = response) => {
	res.json({
		message: 'PATCH API - controlador'
	})
}

const usuariosDelete = async (req, res = response) => {
	const { id } = req.params

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

	res.json(usuario)
}

export { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete }
