import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/jwtHelper.js";
import { CustomError } from "../utils/customError.js";

export const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("User not found",404)
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomError("Invalid password",401)
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
    next(error);
  }
};

export const registerHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      throw new CustomError("User Already exists", 403)
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      throw new CustomError("Error in hashing password")
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
    next(error);
  }
};

export const verifyTokenHandler = (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];

  if (!token) {
    throw new CustomError("Token is required",400)
  }

  try {
    const decoded = verifyToken(token);
    return res.status(200).json({ message: "Token is valid", decoded });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(error);
    }
    error = new CustomError("Invalid token", 401);
    next(error);
  }
};

export const changePasswordHandler = async (req, res, next) => {
  try {
    const { userId } = req.userId;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      throw new CustomError("Current and new passwords are required",400)
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404)
    }

    // Verify the current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new CustomError("Invalid current password",401)
    }

    // Ensure the new password isn't the same as the old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new CustomError("New password cannot be the same as the current password", 400)
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    if (!hashedNewPassword) {
      throw new CustomError("Error in hashing new password")
    }

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    next(error);
  }
};

