import express from "express";
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For generating JWT tokens
import User from "../models/User.js"; // Importing the User model

const router = express.Router();

// Middleware to protect routes that need authentication
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = decoded; // Decoded user info (id, email, etc.)
    next();
  });
};

// Signup Route
router.post("/signup", async (req, res) => {
  const {username, email, password} = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({message: "User already exists"});
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a JWT token after the user is created
    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({message: "User created successfully", token}); // include the token in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error creating user"});
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: "Invalid email"});
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "Invalid password"});
    }

    // Generate JWT token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({message: "Login successful", token});
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({message: "Error logging in", error: err.message});
  }
});

// Route to get user details (Authenticated Route)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Fetch the user by id from the token
    if (!user) return res.status(404).send({message: "User not found"});
    res.json({username: user.username, email: user.email}); // Return username and email address
  } catch (err) {
    res.status(500).send({message: "Error fetching user details"});
  }
});

export default router;
