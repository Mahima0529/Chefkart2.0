const { createBooking, getBookings, getBookingById, updateBooking, deleteBooking } = require('../controller/Booking.Controller');
const { verifyToken } = require('../middleware/AuthMiddleware');
const router = require('express').Router();

router.post('/createBook', createBooking);
router.post('/createBooking', createBooking);
router.post('/create', createBooking);
router.get('/get', getBookings);
router.get('/getAll', getBookings);
router.get('/get/:id', getBookingById);
router.put('/updateBooking/:id', updateBooking);
router.put('/update/:id', updateBooking);
router.delete('/deleteBooking/:id', deleteBooking);
router.delete('/delete/:id', deleteBooking);
router.delete('/delete', deleteBooking);

module.exports = router;