import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    // Extract the port and database name from the connection object
    const host = conn.connection.host;
    const port = conn.connection.port || 27017; // Default to 27017 if port is not set
    const dbName = conn.connection.name; // Extract the database name from the connection object

    console.log(`MongoDB Connected Successfully at ${host}:${port}/${dbName}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
