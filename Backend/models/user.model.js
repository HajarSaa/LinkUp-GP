import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
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
    ],
    // createdAt
    // updatedAt
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
