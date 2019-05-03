const mongoose = require("mongoose");
//const Promise = require('bluebird')
//const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const bcrypt = require("bcryptjs");

mongoose.set("useFindAndModify", false);
const { Schema } = mongoose;

const User = new Schema(
  {
    nombre: String,
    carrera: String,
    telefono: Number,
    email: String,
    tipo: String,
    usuario: String,
    password: String
  },
  {
    collection: "Usuarios"
  }
);

/*User.pre("save", function(next) {
  if (!this.isModified("tipo")) {
    return next();
  }
  this.tipo = bcrypt.hashSync(this.tipo, 9);
  next();
});

User.methods.compareTipo = function(plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.tipo));
};*/

module.exports = mongoose.model("User", User);
