const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    const { seedInitialAdmin } = require('../controller/User.controller');
    await seedInitialAdmin();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;