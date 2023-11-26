import mongoose from 'mongoose'

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN)

		console.log('Base de datos Online')
	} catch (error) {
		throw new Error('Error a la hora de iniciar la base de datos')
	}
}

export { dbConnection }
