const userSchema = require('../Model/userSchema');

const allClientController = async (req, res) => {
  try {
    // Find all documents in the clientSchema collection
    const clients = await userSchema.find();

    // Return the clients as a response

    res.status(200).json(clients)
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = allClientController;
