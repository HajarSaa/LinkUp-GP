import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    messageId: {
      type: mongoose.Schema.ObjectId,
      refPath: "messageType",
      default: null,
    },
    messageType: {
      type: String,
      enum: ["Message", "File"],
    },
    // createdAt
    // updatedAt
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
