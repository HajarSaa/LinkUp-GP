import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
    },
    messageId: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
    member: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
    },
  },
  { timestamps: true }
);
const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
