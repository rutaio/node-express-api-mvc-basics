const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref - nurodo kurioje kolekcijoje yra automobilis, kad galetume apjungti duomenis
      // sitas Car ateina is carModel paskutines eilutes
      ref: 'Car',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'reservations',
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
