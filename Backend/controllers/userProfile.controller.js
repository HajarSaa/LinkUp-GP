import UserProfile from "../models/userProfile.model.js";
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


