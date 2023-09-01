require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://admin:2p4QdCPoyNPZQC1Y@cluster0.lyep2vv.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.use(express.json());

// Define your routes
app.use('/students', require('./routes/students'));
app.use('/teachers', require('./routes/teachers'));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
