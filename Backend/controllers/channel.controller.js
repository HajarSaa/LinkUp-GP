import Channel from "../models/channel.model.js";
import UserProfile from "../models/userProfile.model.js";
import { attachUserProfileData } from "../utils/attchData.js";
import catchAsync from "../utils/catchAsync.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlerFactory.js";

export const getAllChannels = getAll(Channel);
export const getChannel = getOne(Channel);
export const createChannel = createOne(Channel);
export const updateChannel = updateOne(Channel);
export const deleteChannel = deleteOne(Channel);
