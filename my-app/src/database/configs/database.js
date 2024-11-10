const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://hailong:B07NG9oEPjnePkmq@data1.n4z1d.mongodb.net/yourDatabaseName?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
