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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual populate for messages
channelSchema.virtual("messages", {
  ref: "Message",
  foreignField: "channelId",
  localField: "_id",
});

// Indexes
// Channels in the same workspace
channelSchema.index({ workspaceId: 1 });
// By type (public or private)
channelSchema.index({ type: 1 });

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
