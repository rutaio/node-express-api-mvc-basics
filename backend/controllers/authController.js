// this is where the magic happens!
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1.Patikriname, ar visi laukai uzpildyti:
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fiels are required!' });
    }

    // 2. Patikriname ar email jau egzistuoja musu duomenu bazeje:
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 3. Sukuriame nauja vartotoja:
    const user = new User({
      name,
      email,
      password,
    });

    // pats MongoDB pasirupins, kad slaptazodis butu uzkoduotas ir issaugotas (logika aprasyra userModel.js):
    user.save();

    // 4. sugeneruojame JWT tokena:
    // id - tai yra vartotojo id, kuris leis mums atpazinti kuris cia useris kreipiasi i serveri.
    // JWT_SECRET - serverio slaptazodis, kad niekas negaletu padirbti tokeno.
    // expiresIn - tai laikas, po kurio tokenas bus nebegaliojantis.
    // TOKENAS NERA SAUGOMAS DUOMENU BAZEJE; JIS YRA ATIDUODAMAS VARTOTOJUI!!!!
    //(jis negyvens duomenu bazeje, tik serveryje ir userio narsykleje - jei sutampa tie tokenai, OK; jei ne - turesime atjungti useri is website)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res
      .status(201)
      .json({ access_token: token, message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    // issitraukiame duomenis is inputu:
    const { email, password } = req.body;

    // 1.Patikriname, ar zmogus uzpilde visus input laukus:
    if (!email || !password) {
      return res.status(400).json({ error: 'All fiels are required!' });
    }

    // 2. Patikriname ar useris egzistuoja musu duomenu bazeje:
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 3. patikriname ar slaptazodis sutampa su duomenu bazeje esanciu slaptazodziu:
    // grazins true/false:
    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 4. jei true, sugeneruojame nauja JWT access token, kad zmogus galetu ji issisaugoti localStorage:
    // tokenas visada bus skirtingas
    // svarbu nurodyti expiresIn
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    // 5. Atiduodame tokena zmogui:
    res
      .status(201)
      .json({ access_token: token, message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // 1. Issitraukiam tokena is request headerio:
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // 2. Tikriname ar tokenas egzistuoja:
    if (!token) {
      return res.status(401).json({ error: 'Unauthorised' });
    }

    // 3. Tikriname ar tokenas yra validus (ar nepasibaiges, etc):
    // Naudosime JWT_SECRET:
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Issitraukiame userio duomenis is duomenu bazes (isskyrus pwd):
    const user = await User.findById(decoded.userId).select('-password');

    // 5. user nera arba yra:
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
