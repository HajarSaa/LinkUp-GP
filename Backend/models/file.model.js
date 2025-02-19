import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
  },
  fileSize: {
    String,
  },
  fileType: {
    String,
  },
  sentBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
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
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);
export default File;
