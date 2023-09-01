const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  subjectsHandled: [String, Number],
  department: String
});

module.exports = mongoose.model('Teacher', teacherSchema);
