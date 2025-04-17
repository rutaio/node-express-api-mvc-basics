const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// New user registration:
router.post('/register', authController.register);
// Existing user login:
router.post('/login', authController.login);
// User profile:
router.get('/user', authController.getCurrentUser);

module.exports = router;