// Controller - valdo logika, kaip reaguoti i API uzklausas/requests, ir kreipiasi i Model, jeigu atitinka business logika (t.y. grazins visada):
const Car = require('../models/carModel');
const Reservation = require('../models/reservationModel');

// GET: ankstesnis budas:
//const getCars = (req, res) => {
//  res.json(Car.getAllCars());
//};

// GET: naujas budas - works on postman :)
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET by id: ankstesnis budas:
// const getCarById = (req, res) => {
// const carId = req.params.id;
// const car = Car.getCarById(carId);

// if (!car) {
//   return res.status(404).json({ message: 'Car not found!' });
// }
// res.json(car);
// };

// GET by id: naujas budas: - works on postman! :)
exports.getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// ADMIN only
// POST - works on postman! :)
exports.createCar = async (req, res) => {
  try {
    // authMiddleware atiduoda mums user objekta, is kurio suzinome kad useris yra admin arba ne
    // be authMiddleware negaletume patikrinti ar useris yra: a)prisijunges, b)admin
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'No authorized. Admin access required' });
    }

    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ message: 'Car created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a car in a server' });
  }
};

// ADMIN only
// PATCH - works on postman :)
exports.updateCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'No authorized. Admin access required' });
    }

    const carId = req.params.id;
    const updates = req.body;
    const updatedCar = await Car.findByIdAndUpdate(carId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({ message: 'Car updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update a car in a server' });
  }
};

// ADMIN only
// DELETE - how to test with postman if this is correct??
exports.deleteCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'No authorized. Admin access required' });
    }

    const carId = req.params.id;

    // nueis i rezervaciju lentele ir suras visas rezervacijas su sia car:
    await Reservation.deleteMany({ carId });

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// exports: ankstesnis budas:
//module.exports = {
// getCars,
// getCarById,
// };
