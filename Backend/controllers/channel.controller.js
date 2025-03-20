import Channel from "../models/channel.model.js";
import UserProfile from "../models/userProfile.model.js";
import AppError from "../utils/appError.js";
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

  // Attach the user into members array in the request body
  req.body.members = [req.body.createdBy];

  // Create the channel
  const doc = await Channel.create(req.body);

  // Send response
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

// Join a channel
export const joinChannel = catchAsync(async (req, res, next) => {
  // Find the channel
  const channel = await Channel.findById(req.params.id);
  
  // Check if the user is already a member of the channel
  if (channel.members.includes(req.body.userId)) {
    return next(new AppError("You are already a member of this channel", 400));
  }

  // Push the user to channel's members array
  channel.members.push(req.body.userId);

  // Await saving the channel
  await channel.save();

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      channel,
    },
  });
});

export const leaveChannel = catchAsync(async (req, res, next) => {
  // Find the channel
  const channel = await Channel.findById(req.params.id);

  // Check if the user is a member of the channel
  if (!channel.members.includes(req.body.userId)) {
    return next(new AppError("You are not a member of this channel", 400));
  }

  // Remove the user from channel's members array
  channel.members = channel.members.filter(
    (member) => member.toString() !== req.body.userId
  );

  // Await saving the channel
  await channel.save();

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      channel,
    },
  });
});
