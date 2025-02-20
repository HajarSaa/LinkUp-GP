import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
    },
    messageId: {
      type: mongoose.Schema.ObjectId,
      refPath: "messageType",
    },
    messageType: {
      type: String,
      enum: ["Message", "File"],
    },
    member: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    // createdAt
    // updatedAt
  },
  { timestamps: true }
);
const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
