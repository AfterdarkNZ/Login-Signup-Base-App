import jwt from "jsonwebtoken";
import User from "./models/User"; // Adjust the path to your User model

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({message: "Access Denied"});

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
    req.user = await User.findById(verified.id).select("-password");
    if (!req.user) return res.status(404).json({message: "User not found"});
    next();
  } catch (err) {
    res.status(400).json({message: "Invalid Token"});
  }
};

export default authMiddleware;
