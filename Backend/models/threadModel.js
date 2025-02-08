import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  parentMessageID: {
    type: String,
    ref: "TextMessage",
    default: null,
  },
  channelID: {
    type: String,
    ref: "Channel",
  },
  createdBy: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Thread = mongoose.model("Thread", threadSchema);
export default Thread;
