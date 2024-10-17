import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/jwtHelper.js";

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken({ userId: user._id, email: user.email });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

export const registerHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(403).json({ message: "User Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error in hashing password" });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyTokenHandler = (req, res) => {
  const token = req.body.token || req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = verifyToken(token);
    return res.status(200).json({ message: "Token is valid", decoded });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};
