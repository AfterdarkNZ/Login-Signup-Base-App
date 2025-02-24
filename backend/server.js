import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // For handling CORS requests
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // Importing the user routes
import User from "./models/User.js"; // Adjust path to your User model

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // Enable CORS for all routes

// Define the user routes
app.use("/api/users", userRoutes);

app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId); // Fetch user details using the userId
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    res.json({username: user.username}); // Return the username
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
  }
});

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
