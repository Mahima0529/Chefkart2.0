const Razorpay = require('razorpay');

let razorpayInstance = null;

try {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_chefkartdemo';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'chefkartsecret12345';

  razorpayInstance = new Razorpay({
    key_id,
    key_secret
  });
} catch (error) {
  console.warn("⚠️ Razorpay initialization warning:", error.message);
}

module.exports = razorpayInstance;
