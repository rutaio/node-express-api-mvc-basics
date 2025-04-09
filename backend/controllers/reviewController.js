const Reviews = require('../models/reviewModel');

// GET: tai yra RESPONSE, ka atsako backendas:
const getReviews = (req, res) => {
  res.status(201).json(Reviews.getAllReviews());
};

// POST: zmogus praso issaugoti duomenis, todel tai yra REQUEST:
const createReview = (req, res) => {
  try {
    const { name, rating, description } = req.body;

    // galime rasyti kaip viena IF arba kelius IF:
    // if (!name || !rating || !description) {
    //   res
    //     .status(400)
    //     .json({ error: 'Name, description and rating are required!' });
    // }

    if (!name) {
      res.status(400).json({ error: 'Name is required!' });
    }

    if (!rating) {
      res.status(400).json({ error: 'Rating is required!' });
    }

    if (!description) {
      res.status(400).json({ error: 'Description is required!' });
    }

    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Rating must be between 1 and 5!' });
    }

    Reviews.createReview({ name, rating, description });
    res.status(201).json({ message: 'Review created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getReviews,
  createReview,
};
