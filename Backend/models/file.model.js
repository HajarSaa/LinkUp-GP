import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    fileSize: {
      type: String,
    },
    fileType: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
    },
    channelId: {
      type: mongoose.Schema.ObjectId,
      ref: "Channel",
      default: null,
    },
    conversationId: {
      type: mongoose.Schema.ObjectId,
      ref: "Conversation",
      default: null,
    },
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
    },
    parentMessageId: {
      type: mongoose.Schema.ObjectId,
      refPath: "parentType",
      default: null,
    },
    parentType: {
      type: String,
      enum: ["Message", "File"],
    },
  },
  { timestamps: true }
);

// Indexes
// All replies to a message && Oldest first (Threads)
fileSchema.index({ parentMessageId: 1, createdAt: 1 }, { sparse: true });
// Newest first (Channels)
fileSchema.index({ channelId: 1, createdAt: -1 }, { sparse: true });
// Newest first (Conversations)
fileSchema.index({ conversationId: 1, createdAt: -1 }, { sparse: true });

const File = mongoose.model("File", fileSchema);
export default File;
