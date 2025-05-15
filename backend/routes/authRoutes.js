const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// New user registration:
router.post('/register', authController.register);
// Existing user login:
router.post('/login', authController.login);

// User profile:
// kai middleware uzdedame per viduri, reiskia mum svarbu patikrinti ar useris yra authentifikuotas:
router.get('/user', authMiddleware, authController.getCurrentUser);
// All users:
router.get('/users', authMiddleware, authController.getAllUsers);

// PUT request:
router.put('/user/update-role/:id', authMiddleware, authController.updateUserRole);

module.exports = router;
