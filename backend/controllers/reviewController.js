const Reviews = require('../models/reviewModel');

const getReviews = (req, res) => {
  res.json(Reviews.getReviews());
};

module.exports = {
  getReviews,
};
