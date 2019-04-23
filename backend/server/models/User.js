const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const { Schema } = mongoose

const User = new Schema({
    usuario: String,
    password: String,
},
{
    collection: 'Usuarios'
})

module.exports =  mongoose.model('User', User)