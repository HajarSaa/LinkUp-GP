import mongoose from "mongoose";
import Conversation from "./converstion.model.js";
import Channel from "./channel.model.js";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UserProfile",
      },
    ],
    joinCode: {
      type: String,
    },
    settings: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Indexes
// workspaces created by the same user
workspaceSchema.index({ createdBy: 1 });
// workspaces where a user is a member of
workspaceSchema.index({ joinCode: 1 });

// virtual populate
workspaceSchema.virtual("conversations", {
  ref: "Conversation",
  foreignField: "workspaceId", // acts as a foreign key
  localField: "_id", // acts as a primary key
});

workspaceSchema.virtual("channels", {
  ref: "Channel",
  foreignField: "workspaceId", // acts as a foreign key
  localField: "_id", // acts as a primary key
});

// Instance methods
workspaceSchema.methods.createMemberConversations = async function () {
  const conversations = [];
  const workspaceId = this.id;
  const members = this.members;

  // Create a conversation for each pair of members
  // For n members, we only need (n(n+1))/2 conversations
  for (let i = 0; i < members.length; i++) {
    for (let j = i; j < members.length; j++) {
      // Store memberIds in sorted order to ensure consistency
      const [memberOneId, memberTwoId] = [members[i], members[j]].sort();

      // Check if conversation already exists
      const existingConversation = await Conversation.findOne({
        workspaceId,
        memberOneId,
        memberTwoId,
      });

      if (!existingConversation) {
        conversations.push({
          workspaceId,
          memberOneId,
          memberTwoId,
        });
      }
    }
  }

  // Bulk insert all new conversations
  if (conversations.length > 0) {
    await Conversation.insertMany(conversations);
  }
};

workspaceSchema.methods.deleteConversationsAndChannels = async function () {
  const workspaceId = this._id;

  // Find all conversations associated with the workspace
  const conversations = await Conversation.find({ workspaceId });

  // Loop over each conversation and delete it individually to trigger pre-hooks
  for (const conversation of conversations) {
    await Conversation.findByIdAndDelete(conversation._id); // This will trigger the pre("findOneAndDelete") hook
  }

  // Find all channels associated with the workspace
  const channels = await Channel.find({ workspaceId });

  // Loop over each channel and delete it individually to trigger pre-hooks
  for (const channel of channels) {
    await Channel.findByIdAndDelete(channel._id); // This will trigger the pre("findOneAndDelete") hook
  }
};

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
