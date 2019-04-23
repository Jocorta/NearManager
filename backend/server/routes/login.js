const express = require("express");

const router = express.Router();

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";
function jwtSignUser(user) {
  const SEMANA = 60 * 60 * 24 * 7;
  return jwt.sign(user, jwtSecret, {
    expiresIn: SEMANA
  });
}
//login user
router.post("/", async (req, res) => {
  const { usuario, password } = req.body;
  await User.findOne(
    {
      usuario: usuario
    },
    function(err, docs) {
      if (err) {
        res.send({ message: err, logged: false });
      } else if (!docs) {
        res.send({ message: "Este usuario no existe", logged: false });
      } else if (docs.password !== password) {
        res.send({ message: "Contraseña incorrecta", logged: false });
      } else {
        res.send({
          logged: true,
          message: "Se inicio sesion correctamente",
          user: docs,
          token: jwtSignUser(docs.toJSON())
        });
      }
    }
  );
});

module.exports = router;
