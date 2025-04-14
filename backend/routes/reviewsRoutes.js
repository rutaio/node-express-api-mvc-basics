const express = require('express');

// susiimportuoju ta funkcija is controller'io:
const reviewsController = require('../controllers/reviewController');

// nurodom kad naudosime express routeri, kuris nukreips API requests i atitinkamama controleri:
const router = express.Router();

router.get('/', reviewsController.getReviews);
router.post('/', reviewsController.createReview);
router.patch('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
