const express = require('express');

// susiimportuoju ta funkcija is controller'io:
const { getReviews, createReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);

module.exports = router;
