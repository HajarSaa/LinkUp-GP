import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  workspaces: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workspace',
  },
  
});

const User = mongoose.model("User", userSchema);
export default User;
