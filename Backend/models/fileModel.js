import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileSize: String,
  fileType: String,
  uploadedBy: {
    type: String,
    ref: "User",
  },
  channelID: {
    type: String,
    ref: "Channel",
    default: null,
  },
  threadID: {
    type: String,
    ref: "Thread",
    default: null,
  },
  isDirectMessage: {
    type: Boolean,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);
export default File;
