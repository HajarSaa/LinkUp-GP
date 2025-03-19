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
export const updateChannel = updateOne(Channel);
export const deleteChannel = deleteOne(Channel);

// export const createChannel = createOne(Channel);
export const createChannel = catchAsync(async (req, res, next) => {
  // Attach the workspaceId to the request body if it is in the params
  if (req.params.workspaceId) {
    req.body.workspaceId = req.params.workspaceId;
  }
  const doc = await Channel.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
