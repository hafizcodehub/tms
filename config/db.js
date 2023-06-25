const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hafiz');
    console.log('Database connected' .bgYellow);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connection;
