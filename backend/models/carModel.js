// Model - atsakingas uz duomenu bazes operacijas
// naudosime failu sistema:
const fs = require('fs');
// kelias kaip Node surasti ta faila:
const filePath = './database/cars.json';

const getAllCars = () => {
  const data = fs.readFileSync(filePath);

  // isvalyk faila:
  // konvertuoja JSON string i JavaScript objekta:
  return JSON.parse(data);
};

const getCarById = (id) => {
  const cars = getAllCars();
  // prafiltruoja visus autombilius ir suranda pagal id:
  return cars.find((car) => car.id === id);
};

module.exports = {
  getAllCars,
  getCarById,
};
