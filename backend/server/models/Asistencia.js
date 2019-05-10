const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const { Schema } = mongoose

const Asistencia = new Schema({
    year: String,
    month: String,
    day: String,
    Asistentes:[],   
    curso: String,    
    rutaImagen: String,
},
{
    collection: 'Asistencias'
})

module.exports =  mongoose.model('Asistencia', Asistencia)