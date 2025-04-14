const Review = require('../models/reviewModel');

// GET: tai yra RESPONSE, ka atsako backendas:
// GET - works on postman :)
exports.getReviews = async (req, res) => {
  try {
    // Mongo DB eis ieskoti duomenu, todel turime palaukt:
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST: zmogus praso issaugoti duomenis, todel tai yra REQUEST:
// POST - naujas budas: - how to test with postman if this is correct?
exports.createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST - ankstenis budas:
// exports.createReview = (req, res) => {
// try {
//  const { name, rating, description } = req.body;

// galime rasyti kaip viena IF arba kelius IF:
// if (!name || !rating || !description) {
//    res
//     .status(400)
//     .json({ error: 'Name, description and rating are required!' });
//  }

//  if (rating < 1 || rating > 5) {
//    res.status(400).json({ error: 'Rating must be between 1 and 5!' });
// }

// Reviews.createReview({ name, rating, description });
//  res.status(201).json({ message: 'Review created successfully!' });
//} catch (error) {
//   res.status(500).json({ error: 'Internal server error' });
// }

// PATCH - how to test with postman if this is correct?
exports.updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(201).json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE - how to test with postman if this is correct?
exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(201).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
