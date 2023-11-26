import { Schema, model } from 'mongoose'
import crypto from 'node:crypto'

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es Obligatorio']
	},
	correo: {
		type: String,
		required: [true, 'El correo es Obligatorio'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'La password es Obligatoria']
	},
	img: {
		type: String,
		required: false
	},
	rol: {
		type: String,
		required: true
		// enum: ['ADMIN_ROLE', 'USER_ROLE']
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
})

UsuarioSchema.methods.toJSON = function () {
	const { __v, password, _id, ...usuario } = this.toObject()
	// usuario.uid = crypto.randomUUID()
	usuario.uid = _id
	return usuario
}

export default model('Usuario', UsuarioSchema)
