import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, {
    expiresIn: "30d",
  });
};

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res
        .status(400)
        .json({ success: false, message: "Choose Another UserName" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log(newUser);
    return res.status(201).json({
      success: true,
      message: "Registerd Successfully",
      newUser,
      token: generateTokens(newUser._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Does Not Exist" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      user,
      token: generateTokens(user._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
