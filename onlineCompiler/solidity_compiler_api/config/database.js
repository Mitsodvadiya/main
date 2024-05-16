const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/codequestions';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, options);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

module.exports = connectDB;
