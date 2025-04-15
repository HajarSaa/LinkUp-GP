import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sentBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
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
      refPath: "parentType",
      default: null,
    },
    parentType: {
      type: String,
      enum: ["Message", "File"],
    },
    // createdAt

    createdAt: {
      type: Date,
      default: Date.now,
    },

    // updatedAt
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
