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
