import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  workspaceID: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
  },
  messageID: {
    type: mongoose.Schema.ObjectId,
    refPath: "messageType",
  },
  messageType: {
    type: String,
    enum: ["TextMessage", "File"],
  },
  member: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
