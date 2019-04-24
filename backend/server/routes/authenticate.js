const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

//authenticate user
router.post("/", (req, res) => {
  jwt.verify(req.body.token, "secret", function(err, decoded) {
    if (!decoded || err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

module.exports = router;
