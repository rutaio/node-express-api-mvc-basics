const Reviews = require('../models/reviewModel');

// GET: tai yra RESPONSE, ka atsako backendas:
const getReviews = (req, res) => {
  res.status(201).json(Reviews.getAllReviews());
};

// POST: zmogus praso issaugoti duomenis, todel tai yra REQUEST:
const createReview = (req, res) => {
  try {
    const { name, rating, description } = req.body;

    if (!name || !rating || !description) {
      res
        .status(400)
        .json({ message: 'Name, description and rating are required!' });
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: 'Rating must be between 1 and 5!' });
    }

    Reviews.createReview({ name, rating, description });
    res.status(201).json({ message: 'Review created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getReviews,
  createReview,
};
