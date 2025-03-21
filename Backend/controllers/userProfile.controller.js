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
  const userProfile = UserProfile.find({ user:req.user.id })
});
