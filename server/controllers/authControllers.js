// controllers/authController.js
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";

// Registration logic
export const register = async (req, res) => {
  try {
    const { email, phone, name, password, address } = req.body;
    const requiredFields = {
      name: "Name",
      email: "Email",
      password: "Password",
      phone: "Phone No",
      address: "Address",
    };

    //Validation
    for (const field in requiredFields) {
      if (!req.body[field]) {
        return res.send({ error: `${requiredFields[field]} is Required` });
      }
    }

    // Check if the username is already taken
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = await new userModel({
      email,
      name,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration Succesful",
      newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Login logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        sucess: false,
        message: "Invalid email or Password",
      });
    }

    // Find the user by username
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

    
    res.status(200).send({
      success: true,
      message: "Login Sucessful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({
        success: false,
        message: 'Error in Login',
        error
      });
  }
};

//test controller
export const testController = (req,res,)=>{
    res.send("Protected Route");
  }
