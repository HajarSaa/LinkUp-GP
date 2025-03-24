import UserProfile from "../models/userProfile.model.js";
import catchAsync from "../utils/catchAsync.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlerFactory.js";

export const getAllUserProfiles = getAll(UserProfile);
export const getUserProfile = getOne(UserProfile);
export const createUserProfile = createOne(UserProfile);
export const updateUserProfile = updateOne(UserProfile);
export const deleteUserProfile = deleteOne(UserProfile);

export const updateMyProfile = catchAsync(async (req, res, next) => {
  const userProfile = UserProfile.find({ user: req.user.id });
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
