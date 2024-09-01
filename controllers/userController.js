import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login admin
const loginAdmin = async (req, res) => {
    console.log("Admin login endpoint hit"); // Add this line
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
  
      if (!user || user.userType !== 'admin') {
        return res.json({ success: false, message: "Admin does not exist" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }
  
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
        userType: user.userType,
        userId: user._id,
        name: user.name 
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error during authentication" });
    }
  };
  

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user || user.userType !== 'client')  {
      return res.json({ success: false, message: "Client does not exist or is not a client" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      message: "Login successful",
      user: {
        name: user.name,  // Include the user's name
        email: user.email // Optionally include the user's email
      }

    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error during authentication" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format and password strength
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      message: "Registration successful"
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error during registration" });
  }
};

// Create a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export { loginUser, registerUser, loginAdmin };