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
// PATCH is used for partially updating existing resources (PUT is used for replacing resources):
router.patch('/:id', authMiddleware, carsController.updateCar);
router.delete('/:id', authMiddleware, carsController.deleteCar);

module.exports = router;
