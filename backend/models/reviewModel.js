const fs = require('fs');
const filePath = './database/reviews.json';
// isirasome id generator:
const { v4: uuidv4 } = require('uuid');

// GET:
const getAllReviews = () => {
  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
};

// POST:
// pasitinkame objekta, kuri issiunteme Controlleryje:
const createReview = (reviewData) => {
  const reviews = getAllReviews();

  // sukuriame nauja review su userio duomenimis:
  const newReview = {
    // iskvieciame id generatoriu cia:
    id: uuidv4(),
    ...reviewData,
    date: new Date().toISOString(),
  };

  // pridedame prie esamu reviews:
  reviews.push(newReview);
  fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));

  return newReview;
};

module.exports = {
  getAllReviews,
  createReview,
};
