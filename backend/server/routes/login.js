const express = require("express");

const router = express.Router();

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "secret";
function jwtSignUser(user) {
  const SEMANA = 60 * 60 * 24 * 7;
  return jwt.sign({ id: 
    user._id, 
    //tipo: user.tipo 
  }, 
  jwtSecret, {
    expiresIn: SEMANA
  });
}
//login user
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  await User.findOne(
    {
      username: username
    },
    function(err, docs) {
      if (err) {
        res.send({ message: err, logged: false });
      } else if (!docs || docs.password !== password) {
        res.send({ message: "Password or Username incorrect", logged: false });
      } else {
        res.send({
          logged: true,
          message: "Login successful",
          user: docs,
          token: jwtSignUser(docs.toJSON())
        });
      }
    }
  );
});

module.exports = router;
