const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  birthday: Date, // Use Date data type for birthday
  phoneNumber: String, // Use String for phone number
});

module.exports = mongoose.model('Client', clientSchema); // Use 'Client' as the model name
