import mongoose from "mongoose";

const textMessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sentBy: {
    type: String,
    ref: "User",
  },
  recipientID: {
    type: String,
    ref: "User",
    default: null,
  },
  channelID: {
    type: String,
    ref: "Channel",
    default: null,
  },
  threadID: {
    type: String,
    ref: "Thread",
    default: null,
  },
  isDirectMessage: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const TextMessage = mongoose.model("TextMessage", textMessageSchema);
export default TextMessage;
