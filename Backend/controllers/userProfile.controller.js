import UserProfile from "../models/userProfile.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll, getOne } from "../utils/handlerFactory.js";

export const getAllUserProfiles = getAll(UserProfile);
export const getUserProfile = getOne(UserProfile);

// Updating the user profile information (not password)
export const updateMyProfile = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next({
      message: "You can't update password here",
      statusCode: 400,
    });
  }

  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = {};
  const allowedFields = ["userName", "email", "about", "status", "photo"];
  Object.keys(req.body).forEach((el) => {
    if (allowedFields.includes(el)) filteredBody[el] = req.body[el];
  });

  // Update user document
  const updatedProfile = await UserProfile.findByIdAndUpdate(
    req.userProfile.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedProfile,
    },
  });
});

// Update user profile image (can be in updateMyProfile  after implementation )
export const updateUserImage = catchAsync(async (req, res, next) => {
  const workspaceId = req.cookies.workspace;
  if (!workspaceId) {
    return next(new AppError("Workspace ID not found ", 404));
  }

  if (!req.file) {
    return next(new AppError("Please upload your image", 400));
  }

  // Set photo path
  const photoPath = req.file.path;

  // Check if the user has a profile in this workspace
  const userProfile = await UserProfile.findOne({
    user: req.user._id,
    workspace: workspaceId,
  });

  if (!userProfile) {
    return next(
      new AppError(
        `No user profile found for user ${req.user._id} in workspace ${workspaceId}`,
        404
      )
    );
  }

  // Update the photo in the user's profile
  userProfile.photo = photoPath;
  await userProfile.save();

  res.status(200).json({
    message: "Success",
    userProfile,
  });
});
