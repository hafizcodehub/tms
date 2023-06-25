const jwt = require('jsonwebtoken');
const userSchema = require('../Model/userSchema');
const bcrypt = require('bcrypt');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({Message:"Email and password are required!"});
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({Message: "User does not exist!"});
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).send({Message :"Invalid password!"});
    }

    // Authentication successful
    const SECRET_KEY = "asdj12Ha_asj123";
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '30d' });

    // Send user information along with token
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address:user.address,
      role: user.role
      // Add other user properties you want to include
    };

    return res.status(200).json({user: userInfo, token, Message:"Login Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({Message :"Internal server error"});
  }
};

module.exports = loginController;
