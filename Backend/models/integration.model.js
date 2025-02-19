import mongoose from "mongoose";

const integrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["youtube", "github", "google"],
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
    },
    // createdAt
    // updatedAt
  },
  { timestamps: true }
);
const Integration = mongoose.model("Integration", integrationSchema);
export default Integration;
