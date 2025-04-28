const express = require('express');
const { getStats } = require ('../controllers/statsController.js');
const verifyToken = require('../middleware/authMiddleware.js'); // Import the verifyToken middleware

const router = express.Router();

router.get('/stats', verifyToken, getStats);

module.exports = router;