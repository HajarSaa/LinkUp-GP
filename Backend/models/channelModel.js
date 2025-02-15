import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["public", "private"], // also include direct messages
    required: true,
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
  workspaceId: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
