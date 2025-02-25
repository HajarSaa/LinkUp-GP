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
// Indexes
// Channels in the same workspace
channelSchema.index({ workspaceId: 1 });
// By type (public or private)
channelSchema.index({ type: 1 });


// TODO handle deleting messages when a channel is deleted


const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
