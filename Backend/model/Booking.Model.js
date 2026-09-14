const mongoose = require('mongoose');

const BookingSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef', required: true },
    bookingDate: { type: Date, required: true },
    
    status: { 
        type: String, 
        enum: ['booked', 'non-booked'], // Updated status options
        default: 'non-booked' // Default to "non-booked"
    },
    amount: { type: Number, default: 200 }, // Booking token amount (₹200)
    orderId: { type: String, default: '' }, // Razorpay order ID
    paymentId: { type: String, default: '' }, // Razorpay payment ID
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model('Booking',BookingSchema);