import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";

const Register = async (req, res) => {
  const { username, name, email, password } = req.body;
  console.log(username, name, email, password);

  //   validating
  if (!username || !name || !email || !password) {
    const missingFields = [];

    if (!username) missingFields.push("Username");
    if (!name) missingFields.push("Name");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");
    
    const messages = missingFields.length > 0 
      ? `${missingFields.slice(0, -1).join(", ")}${missingFields.length > 1 ? " and " : ""}${missingFields.slice(-1)} are Required!` 
      : "";
    
    // console.log(messages);
    
    return res.json({
      message: messages,
      success: false,
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User Already exist,Please Login",
        success: false,
        error: true,
      });
    }

    //  password Incrypting
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashPass,
    });

    return res.json({
      message: "User Created Successfully",
      success: true,
      data: { name: name, email: email },
      status: 201,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "Error while creating User",
      success: false,
      error: true,
      status: 500,
    });
  }
};

// login
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.json({
      message: `${
        !email && !password
          ? "Email And Password"
          : !email
          ? "Email"
          : "Password"
      } Is Required !`,
      success: false,
      error: true,
    });
  }
  try {
    const userCheckingIndatabase = await User.findOne({ email });
    if (!userCheckingIndatabase) {
      return res.json({
        message: "User does not exists",
        success: false,
        error: true,
        status: 401,
      });
    }

    //   chek password now
    const MatchingPass = await bcrypt.compare(
      password,
      userCheckingIndatabase.password
    );
    if (!MatchingPass) {
      return res.json({
        message: "Incorrect password",
        success: false,
        error: true,
      });
    }

    //   generating Token
    const token = jwt.sign(
      { id: userCheckingIndatabase._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("userToken", token);

    return res.json({
      message: "Login Successfully !",
      success: true,
      token,
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "Error while login ! try again",
      success: false,
      error: true,
      status: 500,
    });
  }
};

// Logout controller
const Logout = async (req, res) => {
  try {
    res.cookie("userToken", "");
    return res.json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error while logout ! try again",
      success: false,
      error: true,
      status: 500,
    });
  }
};

export { Logout, Register, Login };
