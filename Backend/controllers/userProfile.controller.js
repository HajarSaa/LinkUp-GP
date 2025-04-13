import UserProfile from "../models/userProfile.model.js";
import catchAsync from "../utils/catchAsync.js";
import {
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlerFactory.js";

export const getAllUserProfiles = getAll(UserProfile);
export const getUserProfile = getOne(UserProfile);
export const updateUserProfile = updateOne(UserProfile);
export const deleteUserProfile = deleteOne(UserProfile);

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
  if (!req.file) {
    return next(new ApiError("Please Upload Your Image", 404));
  }
  req.body.photo = req.file.path;
  const user = await UserProfile.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "success",
    user,
  });
});
