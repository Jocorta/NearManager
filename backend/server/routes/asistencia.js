const express = require("express");

const router = express.Router();

const Asistencia = require("../models/Asistencia");
//Get user
router.get("/", async (req, res) => {
  const asistencias = await Asistencia.find();
  res.json(asistencias);
});
//Add post Asistencia asistencias
router.post("/", async (req, res) => {
  const asistencias = new Asistencia(req.body);
  await asistencias.save();
  res.status(201).send();
});
//Update Asistencia
router.put("/", async (req, res) => {
  console.log(req.body);
  await Asistencia.findByIdAndUpdate(req.body._id, req.body);

  res.status(202).send();
});
//Delete Asistencia
router.delete("/:id", async (req, res) => {
  await Asistencia.findByIdAndDelete(req.params.id);
  res.status(200).send();
});

module.exports = router;
