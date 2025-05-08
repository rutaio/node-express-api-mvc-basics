const Reservation = require('../models/reservationModel');
const Car = require('../models/carModel');

// Sukuriame rezervacija:
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

// Gaunam vartotojo rezervacijas:
// pasiredaguojam kad grazintu rezervacijas kartu su car duomenimis:
// - naudosime .populate() ir .lean()
exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user._id;
    const reservations = await Reservation.find({ userId })
      .populate('carId', 'make model seats image') // .populate() - istrauk masinos info ir pridek konkrecius laukelius
      .lean(); // .lean() - grazina paprastus js objektus, o ne mongoose dokumentus

    const formattedReservations = reservations.map((reservation) => ({
      ...reservation, // galime rasyti tik ...reservation
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      createdAt: reservation.createdAt,
      car: reservation.carId, // cia jau formatuojame del grozio
      carId: reservation.carId._id, // cia jau formatuojame del grozio
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user reservations' });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    // SVARBU: req.params.id parasytas be ._id, nes traukiame is url, ne is body (mongodb)
    const reservationId = req.params.id;
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    // galima prideti IF ELSE, pvz negali istrint jei jau prasidejo rezervacijos diena ar jei jau yra apmoketa

    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found!' });
    }

    res.status(201).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete a user reservation' });
  }
};
