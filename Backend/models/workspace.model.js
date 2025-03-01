import mongoose from "mongoose";
import User from "./user.model.js";
import Conversation from "./converstion.model.js";

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
        ref: "User",
      },
    ],
    joinCode: {
      type: String,
    },
    settings: String,
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

// Populate conversations on every find query
workspaceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "conversations",
    select: " _id memberOneId memberTwoId",
  });
  next();
});

// Populate channels on every find query
workspaceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "channels",
    select: " _id type name",
  });
  next();
});

// DOCUMENT MIDDLEWARES

// Pre-save: Add creator to members array
workspaceSchema.pre("save", function (next) {
  if (!this.members.includes(this.createdBy)) {
    this.members.push(this.createdBy);
  }
  next();
});

// Helper function to create unique conversations between members
async function createMemberConversations(workspaceId, members) {
  const conversations = [];

  // Create a conversation for each unique pair of members
  // For n members, we only need n(n-1)/2 conversations
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
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
}

// Post-save: Update both workspace and users
workspaceSchema.post("save", async function (doc) {
  // Making sure that the workspace is just created and not updated
  // if (doc._id && doc.isNew) {

  // Update all users to include this workspace in their workspaces array
  await User.updateMany(
    { _id: { $in: doc.members } },
    { $addToSet: { workspaces: doc._id } }
  );

  // create conversations between all the members of the workspace
  await createMemberConversations(doc._id, doc.members);

  // TODO: Generate a unique join code
  // Generate join code if not already present
});

// Pre-update: Store the original document before update
// workspaceSchema.pre(["findOneAndUpdate", "updateOne"], async function (next) {
//   this.oldDoc = await this.model.findOne(this.getQuery());
//   next();
// });
// // Handle member changes after update
// workspaceSchema.post(["findOneAndUpdate", "updateOne"], async function (doc) {
//   // Get the updated and olddocument
//   const updatedDoc = doc || (await this.model.findOne(this.getQuery()));
//   const oldDoc = this.oldDoc;

//   if (updatedDoc && oldDoc) {
//     // Get old and new member lists
//     const oldMembers = oldDoc.members || [];
//     const newMembers = updatedDoc.members || [];

//     // Find members to add and remove
//     const membersToAdd = newMembers.filter(
//       (id) => !oldMembers.includes(id.toString())
//     );
//     const membersToRemove = oldMembers.filter(
//       (id) => !newMembers.includes(id.toString())
//     );

//     // Add workspace to new members' workspaces array
//     if (membersToAdd.length > 0) {
//       await User.updateMany(
//         { _id: { $in: membersToAdd } },
//         { $addToSet: { workspaces: updatedDoc._id } }
//       );
//     }

//     // Remove workspace from removed members' workspaces array
//     if (membersToRemove.length > 0) {
//       await User.updateMany(
//         { _id: { $in: membersToRemove } },
//         { $pull: { workspaces: updatedDoc._id } }
//       );
//     }
//   }
// });

// TODO - Implement deletion of workspace and
// TODO - handle deleting the workspace drom every user's workspace array
// TODO - handle deleting all conversations and channels associated with the workspace

const Workspace = mongoose.model("Workspace", workspaceSchema);
export default Workspace;
