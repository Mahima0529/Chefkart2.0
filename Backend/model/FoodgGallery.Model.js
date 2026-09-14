const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    
 
    image: { type: String },
     // Field to store the image URL or path
    updatedAt: { type: Date, default: Date.now }
});

FoodSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('Food', FoodSchema);