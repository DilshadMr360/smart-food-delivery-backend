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
        id: user._id,
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

// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, currentPassword, newPassword, confirmNewPassword,userId} = req.body;

  console.log('Received userId:', userId); // Log the userId
  console.log('Request Body:', req.body);
  try {
    const updates = { name };

    // Handle password change
    if (currentPassword || newPassword || confirmNewPassword) {
      const user = await userModel.findById(userId);

      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }

      // Validate current password
      if (currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.json({ success: false, message: "Current password is incorrect" });
        }
      }

      // Validate new passwords
      if (newPassword) {
        if (newPassword !== confirmNewPassword) {
          return res.json({ success: false, message: "New passwords do not match" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        updates.password = hashedPassword;
      }
    }

    // Update profile image if provided
    if (req.file) {
      updates.profileImage = req.file.filename;
    }

    // Find the user and update their profile
    const user = await userModel.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        image: user.profileImage
      }
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating profile" });
  }
};


// Get all users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}); // You can also filter based on userType
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching users" });
  }
};



// Create a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
export { loginUser, registerUser, loginAdmin,updateUserProfile, getAllUsers };