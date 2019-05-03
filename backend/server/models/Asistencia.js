const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const { Schema } = mongoose

const Asistencia = new Schema({
    year: String,
    month: String,
    day: String,
    userName: String,
    curso: String,
    tipoAsistencia: String,
    rutaImagen: String,
    carrera: String
},
{
    collection: 'Asistencias'
})

module.exports =  mongoose.model('Asistencia', Asistencia)