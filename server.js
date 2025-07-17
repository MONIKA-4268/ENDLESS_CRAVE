const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const orderRoutes = require('./routes/orderRoutes');

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

// ✅ Use your order routes
app.use('/api', orderRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});