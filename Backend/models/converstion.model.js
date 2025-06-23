import mongoose from "mongoose";
import Message from "./message.model.js";

const conversationSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
      required: true,
    },
    memberOneId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    memberTwoId: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
    },

    // Array of files in the conversation (media in conversation).
    media: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "File",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual populate for messages
conversationSchema.virtual("messages", {
  ref: "Message",
  foreignField: "conversationId",
  localField: "_id",
});

// Indexes
// Conversations in the same workspace
conversationSchema.index({ workspaceId: 1 });

// pre-hook to delete messages when a conversation is deleted
conversationSchema.pre("findOneAndDelete", async function (next) {
  const filter = this.getFilter();

  if (filter._id) {
    // Delete all messages associated with the conversation
    const messages = await Message.find({ conversationId: filter._id });
    for (const message of messages) {
      await message.deleteOne(); // This will trigger the pre-delete hook in the Message model
    }
  }

  next();
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
