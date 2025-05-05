const Reservation = require('../models/reservationModel');
const Car = require('../models/carModel');

// sukuriame rezervacija:
exports.createReservation = async (req, res) => {
  try {
    const { carId, totalDays, startDate, endDate } = req.body;

    // 1. Patikriname, ar zmogus yra authentifikuotas:
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorised' });
    }

    // 2. Patikrinam ar automobilis egzistuoja:
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: 'Car not found!' });
    }

    // 3. Patikrinam ar automobilis yra laisvas pasirinktomis dienomis:
    const isCarAvailable = await Reservation.findOne({
      carId,
      // $expr - leidzia duoti salygas kurios yra sudetinges nei iprastos
      $expr: {
        // $or - leidzia patikrinti ar tokia ar kitokia diena masina yra laisva
        $or: [
          { $gte: ['$startDate', startDate] },
          { $gte: ['$endDate', endDate] },
        ],
      },
    });

    if (isCarAvailable) {
      return res
        .status(400)
        .json({ error: 'Automobilis jau uzrezervuotas siomis dienomis' });
    }

    // 4. Paskaiciuojame kiek kainuos rezervacija
    const totalPrice = car.price * totalDays;

    // 5. Sukuriame rezervacija
    const reservation = new Reservation({
      carId,
      userId,
      startDate,
      endDate,
      totalPrice,
    });
    await reservation.save();

    res.status(201).json({ message: 'Reservation was created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};
