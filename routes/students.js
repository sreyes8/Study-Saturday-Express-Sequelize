const Student = require("../db/models/student");
const express = require("express");
const router = express.Router();
// const router = require("express").Router();
//THIS ROUTER HAS /STUDENTS ALREADY
//get all students from the db
router.get("/", async function(req, res, next) {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    next(err);
  }
  //   console.log(students);
});

router.get("/:id", async function(req, res, next) {
  try {
    const singleStudent = await Student.findById(req.params.id);
    if (!singleStudent) {
      res.sendStatus(404);
    } else {
      res.json(singleStudent);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
});

// look at PUT documentation
router.put("/:id", async function(req, res, next) {
  const [thingy, updatedStudent] = await Student.update(
    {
      firstName: req.body.firstName
      //   lastName = req.body.lastName
    },
    {
      where: { id: req.params.id },
      returning: true,
      plain: true
    }
  );
  res.json(updatedStudent);
});

router.delete("/:id", async function(res, req, next) {
  try {
    const id = req.params.id;
    await Student.destroy({
      where: {
        id
      }
    });
    // res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
