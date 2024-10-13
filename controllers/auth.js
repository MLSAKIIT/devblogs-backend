const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../utils/jwtHelper");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findOne({ email });
    // TODO : verify user

    const token = jwtHelper.createToken({ email: user.email });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerHandler = async (req, res) => {
  const { email, password } = req.body;
  // TODO : Register user
};

module.exports = {
  loginHandler,
  registerHandler,
};
