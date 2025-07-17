const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/submit-order', async (req, res) => {
  console.log("📬 Incoming order request");
  console.log("🔍 Request body:", req.body);

  try {
    const { customerName, amount, paymentMethod } = req.body;

    if (!customerName || !amount || !paymentMethod) {
      console.log("❗ Missing fields:", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = new Order({
      customerName,
      amount: Number(amount),
      paymentMethod
    });

    await newOrder.save();

    console.log("✅ Order placed:", newOrder);
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("❌ Error submitting order:", err);
    res.status(500).json({ error: "Server error while placing order" });
  }
});

module.exports = router;