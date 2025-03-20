import mongoose from "mongoose";
import UserProfile from "./userProfile.model.js";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UserProfile",
      },
    ],
  },
  { timestamps: true }
);
// Indexes
// Channels in the same workspace
channelSchema.index({ workspaceId: 1 });
// By type (public or private)
channelSchema.index({ type: 1 });

// TODO handle deleting messages when a channel is deleted

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
