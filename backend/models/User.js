import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    variable1: {type: Array, default: []},
    variable2: {type: Array, default: []},
    variable3: {type: Array, default: []},
    variable4: {type: Array, default: []},
    variable5: {type: Array, default: []},
  },
  {timestamps: true}
); // Automatically add createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

export default User;
