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
  channelID: {
    type: mongoose.Schema.ObjectId,
    ref: "Channel",
    default: null,
  },
  workspaceID: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
  },
  conversationId: {
    type: mongoose.Schema.ObjectId,
    ref: "Conversation",
  },
  parentMessageID: {
    type: mongoose.Schema.ObjectId,
    refPath: "parentType",
    default: null,
  },
  parentType: {
    type: String,
    enum: ["TextMessage", "File"],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);
export default File;
