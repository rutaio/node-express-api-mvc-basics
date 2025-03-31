// carRoutes.js - tai API marsrutai, kurie tvarko uzklausas, susijusias su automobiliais/cars

// kad naudoti Routes, reikia susiinstaliuoti Express:
const express = require('express');

// susiimportuoju ta funkcija:
const { getCars, getCarById } = require('../controllers/carController');

// reikia apsirasyti ir Routeri, kuris nukreips API requests i atitinkama controlleri:
const router = express.Router();

// cia irasau ta funkcija:
router.get('/', getCars);
router.get('/:id', getCarById);


module.exports = router;
