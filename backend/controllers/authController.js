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
