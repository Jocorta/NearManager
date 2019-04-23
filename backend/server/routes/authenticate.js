const express = require("express");
const passport = require("passport");

const router = express.Router();

//const isAuthenticated = require("../polices/isAuthenticated");

//authenticate user
router.get("/", async (req, res) => {
  //console.log(req);
  passport.authenticate("jwt", function(err, user) {
    if (err || !user) {
      res.status(403).send(false);
    } else {
      res.send(true);
      //req.user = user;
    }
  });
});
//router.get("/authenticate", isAuthenticated);

module.exports = router;
