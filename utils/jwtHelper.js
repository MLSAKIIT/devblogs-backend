require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); 
  } catch (error) {
    throw error; 
  }
};

module.exports = { createToken, verifyToken };
