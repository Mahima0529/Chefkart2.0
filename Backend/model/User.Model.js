const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update the updatedAt field before saving
UserSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('User', UserSchema);