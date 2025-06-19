import Channel from "../models/channel.model.js";
import Message from "../models/message.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll } from "../utils/handlerFactory.js";

export const getAllChannels = catchAsync(async (req, res, next) => {
  const workspaceId = req.workspace.id;
  const userId = req.userProfile.id;

  // Get all public channels
  const publicChannels = await Channel.find({ workspaceId, type: "public" });
  // Get private channels where the user is a member
  const privateChannels = await Channel.find({
    type: "private",
    members: userId,
  });

  // Combine and remove duplicates if necessary
  const allChannels = [...publicChannels, ...privateChannels];

  // Send the response
  res.status(200).json({
    status: "success",
    results: allChannels.length,
    data: {
      channels: allChannels,
    },
  });
});

export const deleteChannel = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  // Check if the channel is the dafault channel
  const channel = await Channel.findById(channelId);

  // Check if the channel exists
  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  if (channel.required) {
    return next(new AppError("Cannot delete the required channel", 400));
  }

  // Delete the channel
  await Channel.findByIdAndDelete(channelId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getChannel = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  const channel = await Channel.findById(channelId);

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

  // Check if the channel name already exists in the workspace
  const existingChannel = await Channel.findOne({
    name: req.body.name,
    workspaceId: req.body.workspaceId,
  });
  if (existingChannel) {
    return next(
      new AppError("There is a channel with the same name. Try to join it", 400)
    );
  }

  // Create the channel
  const channel = await Channel.create(req.body);

  // Send response
  res.status(201).json({
    status: "success",
    data: { channel },
  });
});

export const updateChannel = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  const { name, type, topic, description } = req.body;

  // Find the channel
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  // Validate the { name, type, topic, description }

  // Update the channel
  if (name) channel.name = name;
  if (type) channel.type = type;
  if (topic) channel.topic = topic;
  if (description) channel.description = description;

  // Save the updates
  await channel.save();

  // Send the response
  res.status(200).json({
    status: "success",
    data: { channel },
  });
});

export const joinChannel = catchAsync(async (req, res, next) => {
  // Attach data into request body
  req.body.userId = req.userProfile.id;

  // Find the channel
  const channel = await Channel.findById(req.params.id);

  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

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

  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  // Check if the channel is the default channel
  if (channel.required) {
    return next(new AppError("Cannot leave the required channel", 400));
  }

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
    message: "Successfully left the channel",
    data: {
      channelId: channel._id,
      channelName: channel.name,
    },
  });
});
