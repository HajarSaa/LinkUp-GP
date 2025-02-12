import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  joinCode: {
    type: String,
  },
  settings: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
