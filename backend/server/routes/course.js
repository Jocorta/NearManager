const express = require("express");
const router = express.Router();
const Curso = require("../models/Curso");

// Get courses
router.get("/", async (req, res) => {
    const cursos = await Curso.find();
    res.json(cursos);
});

//Add course
router.post("/", async (req, res) => {
    const curso = new Curso(req.body);
    await curso.save();
    res.json({
        status: 'Curso Agregado'
    })
});

//Update course
router.put("/", async (req, res) => {
    await Curso.findByIdAndUpdate(req.body._id, req.body);
    res.json({
        status: 'Curso Actualizado'
    })
});

//Delete user
router.delete("/:id", async (req, res) => {
    await Curso.findByIdAndDelete(req.params.id);
    res.status(200).send();
});

module.exports = router;
