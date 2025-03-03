import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "please provide a valide eamil"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    passwordChangedAt: Date,
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

// Indexes
// Users in the same workspace
userSchema.index({ workspaces: 1 });

// Query middlewares
// populating workspaces when finding a user
userSchema.pre(/^find/, function (next) {
  this.populate("workspaces");
  next();
});

// Document Middlewares
// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Hash the password only if it has been modified
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// Instance methods
// Compare the user password with the provided password
userSchema.methods.correctPassword = async function (candidatepass, userpass) {
  return await bcrypt.compare(candidatepass, userpass);
};

// Check if the user changed password after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // Convert the passwordChangedAt date to seconds
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // Return true if the password was changed after the token was issued 
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
export default User;
