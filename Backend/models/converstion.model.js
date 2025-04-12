import mongoose from "mongoose";

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

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
