import mongoose from "mongoose";

const laterItemSchema = new mongoose.Schema({
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  itemType: {
    type: String,
    enum: ["Message", "File"],
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["in-progress", "completed"],
    default: "in-progress",
  },
  reminderAt: { type: Date, default: null },
  savedAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false },
});

laterItemSchema.index(
  { userProfile: 1, itemId: 1, itemType: 1 },
  { unique: true }
);

export default mongoose.model("LaterItem", laterItemSchema);
