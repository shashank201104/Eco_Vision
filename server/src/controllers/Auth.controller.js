//Author - Shashank
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { GenrateToken } from "../lib/Utils.js";

//function to handle user sign in
export const Signuptauth = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  try {
    //checking if any field is invalid
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should contain at least 8 characters" });
    }

    //checking if user with same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    const salt = await bcrypt.genSalt(10);

    //hashing the user's password
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new User({
      email,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: hashedPassword,
      profilePic: "",
    });
    await newUser.save();
    GenrateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//function to handle user login
export const Loginauth = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking for empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Searching for Existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //comparing the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    GenrateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Function to handle Logout
export const Logoutauth = (req, res) => {
  try {
    //reseting the user's JWT cookies
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log("error in logout controller : " + error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//function to check if user is valid
export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
