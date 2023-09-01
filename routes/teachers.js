const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// Create a new teacher
router.post('/', async (req, res) => {
  try {
    // Create a new teacher instance using the data from the request body
    const newTeacher = new Teacher(req.body);

    // Save the new teacher to the database
    const savedTeacher = await newTeacher.save();

    res.status(201).json(savedTeacher);
  } catch (error) {
    console.error('Error creating a teacher:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a list of all teachers
router.get('/', async (req, res) => {
  try {
    // Fetch all teachers from the database
    const teachers = await Teacher.find();

    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific teacher by ID
router.get('/:id', async (req, res) => {
  try {
    // Fetch a specific teacher from the database by ID
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a teacher by ID
router.put('/:id', async (req, res) => {
  try {
    // Find and update a teacher by ID
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated teacher
    });

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json(updatedTeacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a teacher by ID
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete a teacher by ID
    const deletedTeacher = await Teacher.findByIdAndRemove(req.params.id);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete all teachers
router.delete('/', async (req, res, next) => {
  try {
    await Teacher.deleteMany({});
    res.json({ message: 'All teachers deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Update one teacher by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

module.exports = router;
