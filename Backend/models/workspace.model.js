import mongoose from "mongoose";
import User from "./user.model.js";
import Conversation from "./converstion.model.js";
import catchAsync from "../utils/catchAsync.js";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
  foreignField: "workspaceId",
  foreignField: "workspaceId", // acts as a foreign key
  localField: "_id", // acts as a primary key
});

// QUERY MIDDLEWARES

// // Populate conversations on every find query
// workspaceSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "conversations",
//     select: " _id memberOneId memberTwoId",
//   });
//   next();
// });

// // Populate channels on every find query
// workspaceSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "channels",
//     select: " _id type name",
//   });
//   next();
// });

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

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
