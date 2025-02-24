import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    workspaces: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Workspace",
      },
      // TODO create a userProfle model to store user profile data
      // TODO modify workspaces array to me a pair of workspaceId and and userProfileId
    ],
  },
  { timestamps: true }
);

// Query middlewares
// populating workspaces when finding a user
userSchema.pre(/^find/, function (next) {
  this.populate("workspaces");
  next();
});

// Document Middlewares

const User = mongoose.model("User", userSchema);
export default User;
