const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  birthday: Date,
  phoneNumber: String,
});

module.exports = mongoose.model('Client', clientSchema); 
