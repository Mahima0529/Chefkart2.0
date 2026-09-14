const Booking = require('../model/Booking.Model');
const User = require('../model/User.Model');

// Create Booking
const createBooking = async (req, res) => {
    try {
        let userId = req.body.user || (req.user && req.user.userId);

        // If no user ID provided, but guest provided email, link or create user
        if (!userId && req.body.email) {
            const cleanEmail = req.body.email.trim().toLowerCase();
            let existingUser = await User.findOne({ email: cleanEmail });
            if (!existingUser) {
                existingUser = new User({
                    name: req.body.name || cleanEmail.split('@')[0],
                    email: cleanEmail,
                    role: 'user'
                });
                await existingUser.save();
            }
            userId = existingUser._id;
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID or customer contact email is required" });
        }

        const { chef, bookingDate, status, notes, amount, paymentStatus, orderId, paymentId } = req.body;
        if (!chef || !bookingDate) {
            return res.status(400).json({ message: "Chef and booking date are required" });
        }

        const newBooking = new Booking({
            user: userId,
            chef,
            bookingDate,
            status: status || 'booked',
            notes: notes || '',
            amount: Number(amount) || 499,
            paymentStatus: paymentStatus || 'pending',
            orderId: orderId || '',
            paymentId: paymentId || ''
        });

        await newBooking.save();

        const populatedBooking = await Booking.findById(newBooking._id)
            .populate('user', 'name email')
            .populate('chef', 'name email phone city state');

        res.status(201).json({
            message: "Booking created successfully",
            booking: populatedBooking || newBooking
        });

    } catch (error) {
        console.error("❌ Booking Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email phone')
            .populate('chef', 'name email phone city state area')
            .sort({ createdAt: -1, _id: -1 });

        res.status(200).json({
            message: "Bookings fetched successfully",
            data: bookings || []
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get a single booking
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid booking ID format" });
        }

        const booking = await Booking.findById(id)
            .populate('user', 'name email phone')
            .populate('chef', 'name email phone city state area');

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking fetched successfully",
            data: booking
        });
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update booking
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid booking ID format" });
        }

        const { chef, bookingDate, status, notes, paymentStatus, paymentId, amount } = req.body;
        const updateFields = {};
        if (chef) updateFields.chef = chef;
        if (bookingDate) updateFields.bookingDate = bookingDate;
        if (status) updateFields.status = status;
        if (notes !== undefined) updateFields.notes = notes;
        if (paymentStatus) updateFields.paymentStatus = paymentStatus;
        if (paymentId) updateFields.paymentId = paymentId;
        if (amount !== undefined) updateFields.amount = amount;

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        )
        .populate('user', 'name email phone')
        .populate('chef', 'name email phone city state area');

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking updated successfully",
            data: updatedBooking
        });

    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete single booking by ID
const deleteBooking = async (req, res) => {
    try {
        const id = req.params.id || req.body.id || req.query.id;
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid or missing booking ID" });
        }

        const deleted = await Booking.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking deleted successfully",
            data: deleted
        });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking  
};