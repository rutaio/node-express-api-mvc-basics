// sukuriame rezervacija

exports.createReservation = async (req, res) => {
  try {
    const { carId, totalDays, startDate, endDate } = req.body;
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to cerate reservation' });
  }
};
