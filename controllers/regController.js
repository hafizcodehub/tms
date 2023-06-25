const userSchema = require('../Model/userSchema');
const bcrypt = require('bcrypt');

const regController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    if (!name) {
      return res.status(400).send("Name is required");
    }
    if (!email) {
      return res.status(400).send("Email is required...!");
    }
    if (!password) {
      return res.status(400).send("Password is required...!");
    }
    if (!phone) {
      return res.status(400).send("Phone is required...!");
    }
    if (!address) {
      return res.status(400).send("Address is required...!");
    }

    const checkUser = await userSchema.findOne({ email });
      if (checkUser) {
        return res.status(200).send({Message: "User already exist"});
      }

    // bcrypt the password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({ name, email, password: hashPassword, phone, address, role });
    const savedUser = await newUser.save();

    if (savedUser) {
      return res.status(200).send({Message: "User successfully created"});
    } else {
      return res.status(500).send("There was an error creating the user...!");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = regController;
