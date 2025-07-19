// Load environment variables
require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

// Modular order route
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

// CORS setup (adjust origin in production)
app.use(cors({
  origin: '*'
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Payment route
app.post('/api/payment', (req, res) => {
  const { name, card, amount } = req.body;

  if (!name || !card || !amount) {
    console.error('❌ Invalid payment data:', req.body);
    return res.status(400).json({ error: 'Missing payment fields' });
  }

  console.log('💳 Payment received:', { name, card, amount });
  res.json({ message: 'Payment processed successfully!' });
});

// Start server (Render-compatible)
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});