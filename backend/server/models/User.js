const mongoose = require("mongoose");
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

module.exports = mongoose.model("User", User);
