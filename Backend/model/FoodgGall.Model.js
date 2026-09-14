const mongoose = require('mongoose');

const FoodGallerSchema = new mongoose.Schema({
    
 
    image: { type: String },
     // Field to store the image URL or path
    updatedAt: { type: Date, default: Date.now }
});

FoodGallerSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('FoodGaller', FoodGallerSchema);