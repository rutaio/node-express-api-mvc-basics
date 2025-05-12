const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// cia atliekame MIDDLEWARE'o veiksma (kas ivyksta tarp request ir response)
// - ar useris yra authentifikuotas ar ne
// (kai yra paduodamas Bearer token)

// next - tai tik Middleware budingas dalykas:
const authMiddleware = async (req, res, next) => {
  try {
    // 1. Issitraukiame token is header'io:
    const token = req.header('Authorization')?.replace('Bearer ', '');
    // 2. Pasiziurim ar token egzistuoja:
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // 3. Tikriname ar tokenas yra validus (ar nepasibaiges, etc):
    // Naudosime JWT_SECRET:
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. Issitraukiame userio duomenis is duomenu bazes (isskyrus pwd):

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 5. Pridedam useri prie request objekto:
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = authMiddleware;
