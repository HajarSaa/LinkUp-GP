import mongoose from "mongoose";

const laterItemSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    required: true,
  },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
  reminderAt: {
    type: Date,
    default: null,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
  notified: {
    type: Boolean,
    default: false,
  },
});

laterItemSchema.index({ userProfile: 1, messageId: 1 }, { unique: true });

export default mongoose.model("LaterItem", laterItemSchema);
