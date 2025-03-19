import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import catchAsync from "../utils/catchAsync.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "please provide a valide email"],
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
    workspaceProfiles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "UserProfile",
      },
    ],
  },
  { timestamps: true }
);

// Query middlewares
// populating workspaces when finding a user
userSchema.pre(/^find/, function (next) {
  this.populate("workspaceProfiles");
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
