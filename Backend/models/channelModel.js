import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["public", "private"], // also include direct messages
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
  workspaceID: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
