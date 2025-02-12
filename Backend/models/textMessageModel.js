import mongoose from "mongoose";

const textMessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
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
  conversationId: {
    type: mongoose.Schema.ObjectId,
    ref: "Conversation",
  },
  workspaceID: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
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

const TextMessage = mongoose.model("TextMessage", textMessageSchema);
export default TextMessage;
