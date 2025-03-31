// server.js - visada yra pagrindinis failas, kuris paleidzia serveri ir nukreipia marsrutus i atitinkamus failus
const express = require('express');

// Cors leidzia siusti uzklausas is kito domeno:
const cors = require('cors');

// susiimportuoju routes is kito failo:
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = 3000;

// Cors leidzia siusti uzklausas is kito domeno, pvz: localhost: 3000 (backend) --> localhost:5173
app.use(cors());
app.use(express.json());
// Nukreipiam visas API uzklausas, kurios prasideda /api/cars i carRoutes faila, 
// kuris toliau tvarkys uzklausas, susijusias su automobiliais:
app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
