import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {
    type:String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  message: String,
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
