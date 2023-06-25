const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb+srv://hafiz:hafiz@cluster0.uylotsn.mongodb.net/hafiz?retryWrites=true&w=majority');
    console.log('Database connected' .bgYellow);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connection;
