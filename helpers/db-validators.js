import Role from '../models/role.js'
import Usuario from '../models/usuario.js'

const esRoleValido = async (rol = '') => {
	const existeRol = await Role.findOne({ rol })

	if (!existeRol) {
		throw new Error(`El rol ${rol} no esta REGISTRADO EN la BASE DE DATOS`)
	}
}

// Verificar si correo existe
const emailExiste = async (correo = '') => {
	const existeEmail = await Usuario.findOne({ correo })

	if (existeEmail) {
		throw new Error(
			`El correo ${correo} ya esta REGISTRADO EN la BASE DE DATOS`
		)
	}
}

const usuarioExisteid = async (id) => {
	const usuarioexiste = await Usuario.findById(id)

	if (!usuarioexiste) {
		throw new Error(`El id no existe ${id}`)
	}
}

export { esRoleValido, emailExiste, usuarioExisteid }
