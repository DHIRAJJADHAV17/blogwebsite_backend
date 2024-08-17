import User from "../model/usermodel.js";
import jwt from "jsonwebtoken";

const getUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "password is required",
    });
  }
  try {
    const userinfo = await User.findOne({ email: email });
    if (!userinfo) {
      return res.status(400).json({
        message: "User not Registerd",
      });
    }
    const accessToken = await jwt.sign(
      { userinfo },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "3d",
      }
    );

    if (userinfo.email == email && (await userinfo.matchPassword(password))) {
      return res.json({
        error: false,
        message: "login successful",
        accessToken,
        userinfo,
      });
    } else {
      return res.json({
        error: true,
        message: "Invalid credentials",
        email,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname) {
    return res.status(400).json({
      error: true,
      message: "Name is Required",
    });
  }
  if (!email) {
    return res.status(400).json({
      error: true,
      message: "email is Required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: true,
      message: "password is Required",
    });
  }

  try {
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.status(400).json({
        error: true,
        message: "User already exitsts",
      });
    }

    const user = new User({
      fullname,
      email,
      password,
    });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "3d",
    });

    return res.json({
      error: false,
      user,
      accessToken,
      message: "Registration Done",
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getUser,
  createUser,
};
