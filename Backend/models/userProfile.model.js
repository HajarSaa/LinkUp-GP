import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A user profile must have a user"],
  },
  workspace: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
    required: [true, "A user profile must have a workspace"],
  },
  role: {
    type: String,
    enum: ["owner", "admin", "member"],
    default: "member",
    // owner - the user who created the workspace
    // admin - the user who has admin rights in the workspace
    // member - the user who is a member of the workspace
  },
  userName: {
    type: String,
    required: [true, "A user profile must have a user name"],
  },
  email: {
    type: String,
  },
  about: {
    type: String,
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  photo: {
    type: String,
  },
});

// Indexes
userProfileSchema.index({ user: 1, workspace: 1 }, { unique: true });

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
