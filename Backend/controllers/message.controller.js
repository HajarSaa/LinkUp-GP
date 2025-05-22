import Channel from "../models/channel.model.js";
import Conversation from "../models/converstion.model.js";
import Message from "../models/message.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll } from "../utils/handlerFactory.js";

export const getAllMessages = getAll(Message);

export const getMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const createMessage = catchAsync(async (req, res, next) => {
  // Attach data into request body
  req.body.createdBy = req.userProfile.id;

  // Attach channelId and conversationId if they are passed in the params
  if (req.params.channelId) {
    // Check if the channel exists
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) {
      return next(new AppError("No channel found with that ID", 404));
    }

    req.body.channelId = req.params.channelId;
  }
  if (req.params.conversationId) {
    // Check if the conversation exists
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return next(new AppError("No conversation found with that ID", 404));
    }

    req.body.conversationId = req.params.conversationId;
  }

  const message = await Message.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const updateMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  // Check if the message exists
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Check if the user is the creator of the message
  if (message.createdBy.toString() !== req.userProfile.id) {
    return next(
      new AppError("You are not authorized to update this message", 403)
    );
  }

  // Update the message content
  message.content = req.body.content;
  await message.save();

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const deleteMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  // Check if the message exists
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Check if the user is the creator of the message
  if (message.createdBy.toString() !== req.userProfile.id) {
    return next(
      new AppError("You are not authorized to delete this message", 403)
    );
  }

  // Delete the message
  await message.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
