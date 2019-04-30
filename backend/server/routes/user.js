const express = require("express");

const router = express.Router();

const User = require("../models/User");
//Get user
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
//Add post
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send();
});
//Update user
router.put("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.status(202).send();
});
//Delete user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send();
});
//Get name
router.get("/", async (req, res) => {
  const users = await User.findById(req.params.id);
  console.log(req)
  // res.json(users);
});
module.exports = router;
