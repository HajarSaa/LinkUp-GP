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
      ref: "User",
      required: true,
    },
    memberTwoId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    // createdAt
    // updatedAt
  },
  { timestamps: true }
);


// TODO handle deleting messages when conversation is deleted


const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
