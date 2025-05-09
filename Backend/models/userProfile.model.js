import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import User from "./user.model.js";

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
  lastActive: { type: Date },
  connectionQuality: {
    type: String,
    enum: ["stable", "unstable"],
    default: "stable",
  },
});

// Indexes
userProfileSchema.index({ user: 1, workspace: 1 }, { unique: true });

// Post-save middleware to add userProfile ID to the User's workspaceProfiles array
userProfileSchema.post("save", async (doc) => {
  await User.findByIdAndUpdate(doc.user, {
    $addToSet: { workspaceProfiles: doc._id },
  });
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
