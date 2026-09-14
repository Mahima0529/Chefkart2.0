const express = require('express');
const router = express.Router();
const { getKey, createOrder, verifyPayment } = require('../controller/Payment.controller');

router.get('/getkey', getKey);
router.post('/createOrder', createOrder);
router.post('/create', createOrder);
router.post('/verifyPayment', verifyPayment);
router.post('/verify', verifyPayment);

module.exports = router;
