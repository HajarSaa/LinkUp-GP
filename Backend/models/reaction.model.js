import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    emoji: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Ensure a user can only have one reaction per message per emoji
reactionSchema.index(
  { messageId: 1, createdBy: 1, emoji: 1 },
  { unique: true }
);

const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
