const express = require('express');
const router = express.Router();
const { processData } = require('../controllers/dataController');

// Define the route for processing data
router.post('/process-data', processData);

module.exports = router;