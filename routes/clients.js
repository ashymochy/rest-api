const express = require('express');
const router = express.Router();
const Client = require('../models/client'); 

// CREATE 
router.post('/', async (req, res) => {
  try {
    const newClient = new Client(req.body); 
    const savedClient = await newClient.save();

    res.status(201).json(savedClient);
  } catch (error) {
    console.error('Error creating a client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find(); 

    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE 
router.delete('/:id', async (req, res, next) => { 
  try {
    const deletedClient = await Client.findByIdAndRemove(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
