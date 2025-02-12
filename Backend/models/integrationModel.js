import mongoose from "mongoose";

const integrationSchema = new mongoose.Schema({
  name: String,
  type: String,
  workspaceID: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Integration = mongoose.model("Integration", integrationSchema);
export default Integration;
