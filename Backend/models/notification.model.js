import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mention", "reaction", "reply"],
      required: true,
    },
    recipient: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    triggeredBy: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    messageId: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
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
