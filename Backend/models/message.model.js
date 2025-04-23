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
      validate: {
        validator: function () {
          return !(this.channelId === null && this.conversationId === null);
        },
        message: "Either channelId or conversationId is required",
      },
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
<<<<<<< HEAD
    // createdAt

    createdAt: {
      type: Date,
      default: Date.now,
    },

    // updatedAt
=======
>>>>>>> 87772a274eea2831e3c6d78715d9636135fc5ba4
  },
  { timestamps: true }
);

// Indexes
// All replies to a message && Oldest first (Threads)
messageSchema.index({ parentMessageId: 1, createdAt: 1 }, { sparse: true });
// Newest first (Channels)
messageSchema.index({ channelId: 1, createdAt: -1 }, { sparse: true });
// Newest first (Conversations)
messageSchema.index({ conversationId: 1, createdAt: -1 }, { sparse: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
