import mongoose from "mongoose";

const workspaceInvitationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "expired"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const WorkspaceInvitation = mongoose.model(
  "WorkspaceInvitation",
  workspaceInvitationSchema
);
export default WorkspaceInvitation;
