const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

//authenticate user
router.post("/", (req, res) => {
  jwt.verify(req.body.token, "secret", function(err, decoded) {
    if (!decoded || err) {
      res.send({ log: false, tipo: "null" });
    } else {
      res.send({ log: true, tipo: decoded.tipo });
    }
  });
});

module.exports = router;
