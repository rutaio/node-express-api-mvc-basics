// sis modelis skirtas - ir registracijai, ir login, ir info apie users:

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // neleidziam susikurti dvieju vartotoju su tuo paciu emeil:
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// pries issaugojant slaptazodi, ji uzkoduoja su bcrypt ir ji pavercia i hash'a; ir tik tada issaugosime i duomenu baze:
userSchema.pre('save', async function (next) {
  // Jei slaptazodis nebuvo pakeistas, tiesiog einame toliau ir neskaitome kodo is sitos funkcijos:
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // uzkoduojame slaptazodi su bcrypt i kazkoki atsitiktini stringa:
    // salt - tai papildomas slaptazodis, kuri sugeneruoja ant virsaus egzistuojancio slaptazodzio
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// tikriname ar slaptazodis sutampa su MongoDB ir zmogaus ivestu slaptazodziu:
userSchema.methods.comparePassword = async function (password) {
  // bcrypt.compare() - palygina du slaptazodzius
  // this. - reiskia kad ima duomenis is savo objekto
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
