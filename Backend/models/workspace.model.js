import mongoose from "mongoose";
import User from "./user.model.js";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
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
    // createdAt
    // updatedAt
  },
  { timestamps: true }
);

// Document Middlewares
// Pre-save: Add creator to members array
workspaceSchema.pre("save", function (next) {
  if (!this.members.includes(this.createdBy)) {
    this.members.push(this.createdBy);
  }
  next();
});

// Post-save: Update both workspace and users
workspaceSchema.post("save", async function (doc) {
  // Collect all members including creator
  const allMembers = [...doc.members, doc.createdBy];

  // Update the workspace to ensure all members are in the members array
  await Workspace.findByIdAndUpdate(doc._id, {
    $addToSet: { members: { $each: doc.members } },
  });

  // Update all users to include this workspace in their workspaces array
  await User.updateMany(
    { _id: { $in: allMembers } },
    { $addToSet: { workspaces: doc._id } }
  );
});

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
