import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();



export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log(token);

    // send the response and token
    //  res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "none",
    //     maxAge: 1000 * 60 * 60
    //  })

    // res.status(200).json({
    //     success: true,
    //     message: "Login successful",
    //     token
    // });

    // i want  to send res and cookies in one response

    return res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          maxAge: 1000 * 60 * 60,
        })
        .status(200)
        .json({ success: true, message: "Login successful", token });
    


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    // if (!validator.isStrongPassword(password)) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Password is not strong enough"
    //     });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {}
};




// get all users

export const getAllUsers = async (req, res) => {
    const _id=req._id;
   
  try {
    const users = await UserModel.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
  }
};


// logout 


export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message || error,
    });
  }
}