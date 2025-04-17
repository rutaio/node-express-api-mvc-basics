// server.js - visada yra pagrindinis failas, kuris paleidzia serveri ir nukreipia marsrutus i atitinkamus failus
const express = require('express');

// Cors leidzia siusti uzklausas is kito domeno:
const cors = require('cors');

// naudosime env:
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// susiimportuoju routes is kitu failu:
const carRoutes = require('./routes/carRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const authRoutes = require('./routes/authRoutes');

// .env failas nuo zodzio environment - aplinka. tai tiesiog paprastas tekstinis failas, kuriame saugome kintamuosius kuriu nenorime kad
// kiti turetu. Dazniausiai tai yra slapta informacija, duomenu bazes prisijungimai, PORT ar kokie nors slaptazodziai.
dotenv.config();

const app = express();

// Cors leidzia siusti uzklausas is kito domeno, pvz: localhost: 3000 (backend) --> localhost:5173 (frontend)
app.use(cors());
app.use(express.json());

// Nukreipiam visas API uzklausas, kurios prasideda /api/cars i carRoutes faila,
// kuris toliau tvarkys uzklausas, susijusias su automobiliais:
app.use('/api/cars', carRoutes);

// Reviews API:
app.use('/api/reviews', reviewsRoutes);

// For users logging in:
app.use('/api/auth', authRoutes);

// pasakome kad trauktu info is env failo:
const PORT = process.env.PORT || 3001;

// naudosime mongo db:
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
