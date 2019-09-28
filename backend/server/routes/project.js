const express = require("express");

const router = express.Router();

const Project = require("../models/project");
//Get project
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});
//Add post
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).send();
});
//Update project
router.put("/", async (req, res) => {
  await Project.findByIdAndUpdate(req.body._id, req.body);
  res.status(202).send();
});
//Delete project
router.delete("/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(200).send();
});
//Get name
router.get("/:id", async (req, res) => {
  await Project.findById(req.params.id);
  console.log(req);
  // res.json(projects);
});
module.exports = router;
