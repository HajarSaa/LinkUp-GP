import mongoose from "mongoose";

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
      ref: "User",
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
        ref: "User",
      },
    ],
    // createdAt
    // updatedAt
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
