// Controller - valdo logika, kaip reaguoti i API uzklausas/requests, ir kreipiasi i Model, jeigu atitinka business logika (t.y. grazins visada):
const Car = require('../models/carModel');

const getCars = (req, res) => {
  res.json(Car.getAllCars());
};

const getCarById = (req, res) => {
  const carId = req.params.id;
  const car = Car.getCarById(carId);

  if (!car) {
    return res.status(404).json({ message: 'Car not found!' });
  }
  res.json(car);
};

// iseksportuojame funkcija:
module.exports = {
  getCars,
  getCarById,
};
