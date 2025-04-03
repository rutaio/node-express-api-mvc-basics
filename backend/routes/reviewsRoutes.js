const express = require('express');

// susiimportuoju ta funkcija is controller'io:
const { getReviews } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getReviews);

module.exports = router;
