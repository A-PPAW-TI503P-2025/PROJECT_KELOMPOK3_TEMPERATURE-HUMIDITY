const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sensorRoutes = require('./routes/sensorRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Agar React bisa akses
app.use(bodyParser.json());

// Routes
app.use('/api/sensor', sensorRoutes);
app.use('/api/auth', authRoutes);     
app.use('/api/sensor', sensorRoutes); 

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server Backend running at http://localhost:${PORT}`);
});