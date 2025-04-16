const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// New user registration:
router.post('/register', authController.register);

module.exports = router;