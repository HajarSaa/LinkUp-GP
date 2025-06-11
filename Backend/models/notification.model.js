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
      ref: "Message",
      default: null,
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
