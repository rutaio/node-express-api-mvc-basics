// Model - atsakingas uz duomenu bazes operacijas
// naudosime failu sistema:
// const fs = require('fs');
// kelias kaip Node surasti ta faila:
// const filePath = './database/cars.json';

// GET:
// const getAllCars = () => {
//  const data = fs.readFileSync(filePath);

// isvalyk faila:
// konvertuoja JSON string i JavaScript objekta:
// return JSON.parse(data);
// };

// const getCarById = (id) => {
// const cars = getAllCars();
// prafiltruoja visus autombilius ir suranda pagal id:
//  return cars.find((car) => car.id === id);
// };

// module.exports = {
//  getAllCars,
//  getCarById,
// };

const mongoose = require('mongoose');

// susikuriame paaskinima kaip turi atrodyti car file:
const carsSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: Array,
      required: true,
      trim: true,
    },
    transmission: {
      type: String,
      required: true,
      trim: true,
    },
    fuelType: {
      type: String,
      required: true,
      trim: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'cars',
  }
);

module.exports = mongoose.model('Car', carsSchema);
