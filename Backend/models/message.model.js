import mongoose from "mongoose";
import File from "./file.model.js";
import Reaction from "./reaction.model.js";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: function () {
        return !this.attachments || this.attachments.length === 0;
      }, // Content required if no attachments
    },
    createdBy: {
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
    threadCount: {
      type: Number,
      default: 0,
    },
    threadParticipants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UserProfile",
        default: [],
      },
    ],
    lastRepliedAt: {
      type: Date,
      default: null,
    },
    attachments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "File",
        default: [],
      },
    ],
    messageType: {
      type: String,
      enum: ["text", "file", "mixed"], // text-only, file-only, or text+files
      default: "text",
    },
    readBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UserProfile",
        default: [],
      },
    ],
    edited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    pinnedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      default: null,
    },
    metadata: {
      links: [{}],
    },
  },
  { timestamps: true }
);

messageSchema.pre("validate", function (next) {
  if (!this.channelId && !this.conversationId) {
    this.invalidate(
      "channelId",
      "Either channelId or conversationId is required"
    );
  }
  next();
});

// Pre-delete hook to delet all attachments and reactions associated with the message
messageSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const messageId = this.getQuery()._id;

    // Delete all attachments (files) associated with the message
    await File.deleteMany({
      _id: { $in: (await this.model.findById(messageId)).attachments },
    });

    // Delete all reactions associated with the message
    await Reaction.deleteMany({ messageId });

    next();
  }
);
// Pre-delete hook to delete all attachments and reactions associated with the message (document instance)
messageSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    // "this" refers to the document instance
    const messageId = this._id;

    // Delete all attachments (files) associated with the message
    await File.deleteMany({
      _id: { $in: this.attachments },
    });

    // Delete all reactions associated with the message
    await Reaction.deleteMany({ messageId });

    next();
  }
);

// Indexes
// All replies to a message && Oldest first (Threads)
messageSchema.index({ parentMessageId: 1, createdAt: 1 }, { sparse: true });
// Newest first (Channels)
messageSchema.index({ channelId: 1, createdAt: -1 }, { sparse: true });
// Newest first (Conversations)
messageSchema.index({ conversationId: 1, createdAt: -1 }, { sparse: true });
// Search by content
messageSchema.index({ content: "text" });

const Message = mongoose.model("Message", messageSchema);
export default Message;
