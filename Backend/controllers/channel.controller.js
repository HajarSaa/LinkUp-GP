import Channel from "../models/channel.model.js";
import Message from "../models/message.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll, updateOne } from "../utils/handlerFactory.js";

export const getAllChannels = getAll(Channel);
export const updateChannel = updateOne(Channel);

export const deleteChannel = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  // Delete all messages associated with the channel
  await Message.deleteMany({ channelId });

  // Delete the channel
  await Channel.findByIdAndDelete(channelId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getChannel = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  // Find the channel and populate the virtual "messages" field
  const channel = await Channel.findById(channelId).populate("messages");

  // Check if the channel exists
  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  // Send the response
  res.status(200).json({
    status: "success",
    data: { channel },
  });
});

export const createChannel = catchAsync(async (req, res, next) => {
  // Attach data into request body
  req.body.createdBy = req.userProfile.id;
  req.body.workspaceId = req.workspace.id;
  req.body.members = [req.body.createdBy];

  // Create the channel
  const channel = await Channel.create(req.body);

  // Send response
  res.status(201).json({
    status: "success",
    data: { channel },
  });
});

// Join a channel
export const joinChannel = catchAsync(async (req, res, next) => {
  // Attach data into request body
  req.body.userId = req.userProfile.id;

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
  // Attach data into request body
  req.body.userId = req.userProfile.id;

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
