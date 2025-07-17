document.addEventListener('DOMContentLoaded', () => {
  const methodSelect = document.getElementById('method');

  const sections = {
    upi: document.getElementById('upi-section'),
    card: document.getElementById('card-section'),
    netbanking: document.getElementById('netbanking-section'),
    gpay: document.getElementById('gpay-section'),
    paypal: document.getElementById('paypal-section'),
  };

  methodSelect.addEventListener('change', () => {
    const method = methodSelect.value;
    for (const key in sections) {
      sections[key].classList.add('hide');
    }
    if (sections[method]) {
      sections[method].classList.remove('hide');
    }
  });

  document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const method = methodSelect.value;
    const amountRaw = localStorage.getItem('total');
    const amount = Number(amountRaw);

    if (!name || !method || isNaN(amount) || amount <= 0) {
      alert("❗ Please fill all required fields with valid data.");
      return;
    }

    const orderData = {
      customerName: name,
      amount,
      paymentMethod: method
    };

    try {
      const res = await fetch('http://localhost:3000/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        alert(`✅ Order placed successfully via ${method.toUpperCase()}!`);
        localStorage.clear();
        window.location.href = 'index.html';
      } else {
        const error = await res.json();
        alert(`❌ Failed to place order: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("❌ Server error. Try again later.");
    }
  });
});