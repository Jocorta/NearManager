const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const { Schema } = mongoose

const Asistencia = new Schema({
    date: String,
    userName: String,
    carrera: String,
    tipoAsistencia: String,
    curso: String,    
    rutaImagen: String,
},
{
    collection: 'Asistencias'
})

module.exports =  mongoose.model('Asistencia', Asistencia)