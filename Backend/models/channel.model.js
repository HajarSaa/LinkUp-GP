import mongoose from "mongoose";
import Message from "./message.model.js";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
      required: true,
    },
    topic: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UserProfile",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual populate for messages
channelSchema.virtual("messages", {
  ref: "Message",
  foreignField: "channelId",
  localField: "_id",
});

// Indexes
// Channels in the same workspace
channelSchema.index({ workspaceId: 1, type: 1 });

// Ensure channel names are unique within a workspace
channelSchema.index({ workspaceId: 1, name: 1 }, { unique: true });

// pre-hook to delete messages when a channel is deleted
channelSchema.pre("findOneAndDelete", async function (next) {
  // Access the query filter
  const filter = this.getFilter();

  if (filter._id) {
    // Delete all messages associated with the channel
    await Message.deleteMany({ channelId: filter._id });
  }

  next();
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
