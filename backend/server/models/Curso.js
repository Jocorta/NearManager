const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const { Schema } = mongoose

const Curso = new Schema({
    anio: Number,
	nombre: String,
	encargado:String,
	personas: [String]
},
{
    collection: 'Cursos'
})

module.exports =  mongoose.model('Curso', Curso)