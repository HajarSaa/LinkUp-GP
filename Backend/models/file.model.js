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
    fileUrl: {
      type: String,
      required: true, // Cloudinary URL
    },
    // cloudinary fields
    cloudinaryId: {
      type: String,
      required: true,
    },
    cloudinaryResourceType: {
      type: String,
      enum: ["image", "video", "raw"],
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
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
    parentMessageId: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
      default: null,
    },
    attachedToMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes
// All replies to a message or file (Threads) — Oldest first
fileSchema.index({ parentMessageId: 1, createdAt: 1 }, { sparse: true });
// Channel files — Newest first
fileSchema.index({ channelId: 1, createdAt: -1 }, { sparse: true });
// Conversation files — Newest first
fileSchema.index({ conversationId: 1, createdAt: -1 }, { sparse: true });

const File = mongoose.model("File", fileSchema);
export default File;
