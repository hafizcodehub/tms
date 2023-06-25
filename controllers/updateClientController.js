const userSchema = require('../Model/userSchema');
const User = require('../Model/userSchema');
const bcrypt = require('bcrypt');

const updateClientController = async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the user from the database
    const user = await userSchema.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user data
    user.name = req.body.name;
    user.email = req.body.email;

    // Hash the new password if provided
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }
    user.phone = req.body.phone;
    user.address = req.body.address

    // Save the updated user
    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateClientController;
