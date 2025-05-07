import Auth from "../models/auth";

// Thanks to bcrypt, there's no need for Da Vinci-style encryption.
import bcrypt from "bcryptjs";
import e from "express";

import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!!!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long!!!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
      username,
      email,
      // password: hashedPassword   if u di like this => u get error !
      password: hashedPassword,
    });

    // we will very soon use this token for authentication
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      ...newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!!!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "User not found!!!" });
    }
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(500).json({ message: "Invalid credentials!!!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "OK",
      ...user,
      token,
    });
  } catch (error) {}
};


export { register, login };