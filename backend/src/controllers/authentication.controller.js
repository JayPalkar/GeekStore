import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken } from "../config/utils.js";

export const register = async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are important" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must contain at least 8 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User with same email exist, use different email ",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      });
    } else {
      return res(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};
