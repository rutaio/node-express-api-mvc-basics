const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reservationController.createReservation);
router.get('/', authMiddleware, reservationController.getUserReservations);
router.delete('/:id', authMiddleware, reservationController.deleteReservation);

//ADMIN only:
router.get('/all', authMiddleware, reservationController.getAllReservations);

module.exports = router;
