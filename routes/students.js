const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/', async (req, res, next) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    next(error);
  }
});

// Get all students
router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// Get one student by ID
router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Get multiple students by course
router.get('/byCourse/:course', async (req, res, next) => {
  try {
    const students = await Student.find({ course: req.params.course });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

// Delete one student by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndRemove(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Delete all students
router.delete('/', async (req, res, next) => {
  try {
    await Student.deleteMany({});
    res.json({ message: 'All students deleted successfully' });
  } catch (error) {
    next(error);
  }
});



// Update one student by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
