const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://monika:m1o2n3i4@monika.stxhfe5.mongodb.net/endlesscrave?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Inline routes
app.post('/api/submit-order', (req, res) => {
  const { customerName, amount, paymentMethod } = req.body;
  console.log('Order received:', { customerName, amount, paymentMethod });
  res.json({ message: 'Order submitted successfully!' });
});

app.post('/api/payment', (req, res) => {
  const { name, card, amount } = req.body;
  console.log('Payment received:', { name, card, amount });
  res.json({ message: 'Payment processed successfully!' });
});

// Optional: use modular routes if needed
// const orderRoutes = require('./routes/orderRoutes');
// app.use('/api', orderRoutes);

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});