const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  amount: Number,
  paymentMethod: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);