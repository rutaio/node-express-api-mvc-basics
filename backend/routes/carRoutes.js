// carRoutes.js - tai API marsrutai, kurie tvarko uzklausas, susijusias su automobiliais/cars

const express = require('express');

// ankstesnis budas:
// const { getCars, getCarById } = require('../controllers/carController');
const carsController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', carsController.getCars);
router.get('/:id', carsController.getCarById);
router.post('/', authMiddleware, carsController.createCar);
router.patch('/:id', carsController.updateCar);
router.delete('/:id', carsController.deleteCar);

module.exports = router;
