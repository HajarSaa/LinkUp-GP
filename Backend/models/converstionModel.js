import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  workspaceID: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
  },
  memberOneId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  memberTwoId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
