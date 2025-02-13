import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// user registration
const Register = async (req, res) => {
  const { username, name, email, password } = req.body;
  // console.log(username, name, email, password);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User Already exist,Please Login",
        success: false,
        error: true,
        status:403
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
      data: { name: name, email: email, userId: newUser._id },
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

// get All user
const getAllUserList = async(req,res)=>{
  try {
    const userList = await User.find().select('-password -_id -createdAt -updatedAt -__v');
    if (userList.length === 0) {
      return res.json({
        message:"userList not found...",
        success:false,
        status:401
      })
    }

    return res.json({
      message:"Userlist fetched successfully!",
      success:true,
      data:userList,
      status:200
    })
  } catch (error) {
    return res.json({
      message:"Error while fetching UserList data!",
      success:false,
      status:500
    })
  }
}

export { Logout, Register, Login, getAllUserList };
