const fs = require('fs');
const filePath = './database/reviews.json';

const getReviews = () => {
  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
};

module.exports = {
  getReviews,
};
