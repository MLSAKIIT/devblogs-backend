import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/jwtHelper.js";
import Joi from 'joi';

export const loginHandler = async (req, res) => {
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

export const changePasswordHandler = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Ensure the new password isn't the same as the old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be the same as the current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    if (!hashedNewPassword) {
      return res.status(500).json({ message: "Error in hashing new password" });
    }

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    return res.status(500).json({ message: "An error occurred while changing password" });
  }
};

