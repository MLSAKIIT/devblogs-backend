const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../utils/jwtHelper");
const Joi=require("joi");
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwtHelper.createToken({ email: user.email });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerHandler = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      name:Joi.string().required()
    });
    const { error } = schema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Kindly provide email,name or password" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).send({
            message: "Email is already in use"
        });
    }
    // req.session.tempUser = { name, email, password };
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
const token = jwtHelper.createToken({ email:email });
res.status(200).json({ token, user: newUser });
    // Send a response indicating that OTP was sent
    // res.status(200).send({ message: "OTP sent. Please verify to complete registration." });
} catch (error) {
    next(error);
}
  
  // TODO : Register user
};

const verifyTokenHandler = (req, res) => {
  const token = req.body.token || req.headers["authorization"];
  
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwtHelper.verifyToken(token);
    return res.status(200).json({ message: "Token is valid", decoded });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  loginHandler,
  registerHandler,
  verifyTokenHandler,
};
