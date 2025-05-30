import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
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
      refPath: "parentType",
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
    parentType: {
      type: String,
      enum: ["Message", "File"],
    },
    readBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UserProfile",
        default: [],
      },
    ],
    edited: { type: Boolean, default: false },
    editedAt: { type: Date },
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

messageSchema.pre("validate", function (next) {
  if (this.parentMessageId && !this.parentType) {
    this.parentType = "Message";
  }
  next();
});

// Indexes
// All replies to a message && Oldest first (Threads)
messageSchema.index({ parentMessageId: 1, createdAt: 1 }, { sparse: true });
// Newest first (Channels)
messageSchema.index({ channelId: 1, createdAt: -1 }, { sparse: true });
// Newest first (Conversations)
messageSchema.index({ conversationId: 1, createdAt: -1 }, { sparse: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
