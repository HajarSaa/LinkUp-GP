import Channel from "../models/channel.model.js";
import Conversation from "../models/converstion.model.js";
import Message from "../models/message.model.js";
import File from "../models/file.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll } from "../utils/handlerFactory.js";

export const getAllMessages = getAll(Message);

export const getChannelMessages = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  // Check if the channel exists
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  // Apply pagination to the "messages" field
  const page = req.query.page * 1 || 1; // Default to page 1
  const limit = req.query.limit * 1 || 20; // Default to 10 messages per page
  const skip = (page - 1) * limit;

  // Get all messages in channel that are not replies
  const messages = await Message.find({ channelId, parentMessageId: null })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  });
});

export const getConversationMessages = catchAsync(async (req, res, next) => {
  const conversationId = req.params.id;

  // Check if the conversation exists
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return next(new AppError("No conversation found with that ID", 404));
  }

  // Apply pagination to the "messages" field
  const page = req.query.page * 1 || 1; // Default to page 1
  const limit = req.query.limit * 1 || 20; // Default to 20 messages per page
  const skip = (page - 1) * limit;

  // Get all messages in conversation that are not replies
  const messages = await Message.find({ conversationId, parentMessageId: null })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  });
});

export const getThread = catchAsync(async (req, res, next) => {
  const messageId = req.params.id;

  // Check if the message exists
  const message = await Message.findById(messageId);
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Apply pagination to the "messages" field
  const page = req.query.page * 1 || 1; // Default to page 1
  const limit = req.query.limit * 1 || 20; // Default to 20 messages per page
  const skip = (page - 1) * limit;

  // Get all replies to this message
  const replies = await Message.find({ parentMessageId: messageId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: 1 });

  if (replies.length === 0)
    return next(new AppError("No thread found for this message", 404));

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      messages: replies,
    },
  });
});

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

  // Attach channelId or conversationId from request parameters
  if (req.params.channelId) {
    // Check if the channel exists
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) {
      return next(new AppError("No channel found with that ID", 404));
    }

    // Check if the user is a member of the channel
    if (!channel.members.includes(req.userProfile.id)) {
      return next(new AppError("You are not a member of this channel", 403));
    }

    req.body.channelId = req.params.channelId;
  }
  if (req.params.conversationId) {
    // Check if the conversation exists
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return next(new AppError("No conversation found with that ID", 404));
    }

    // check if the user is a participant in the conversation
    if (
      !(
        req.userProfile.id === conversation.memberOneId.toString() ||
        req.userProfile.id === conversation.memberTwoId.toString()
      )
    )
      return next(
        new AppError("You are not a participant in this conversation", 403)
      );
    req.body.conversationId = req.params.conversationId;
  }

  // If this message is a reply (has a parentMessageId)
  if (req.body.parentMessageId) {
    // Check if the parent message is a message
    const parentMessage = await Message.findById(req.body.parentMessageId);
    if (parentMessage) req.body.parentType = "Message";
    // Check if the parent message is a file
    else if (await File.findById(req.body.parentMessageId))
      req.body.parentType = "File";
    // If neither exists, retyrn an error
    else {
      return next(
        new AppError("No parent message or file found with that ID", 404)
      );
    }

    // Increment threadCount and add user to threadParticipants
    await Message.findByIdAndUpdate(req.body.parentMessageId, {
      $inc: { threadCount: 1 },
      $addToSet: { threadParticipants: req.userProfile.id },
    });
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

  // If this message is a reply (has a parentMessageId)
  if (message.parentMessageId) {
    // Decrement threadCount
    await Message.findByIdAndUpdate(message.parentMessageId, {
      $inc: { threadCount: -1 },
    });

    // Check if the user has any other replies in this thread
    const otherReplies = await Message.findOne({
      parentMessageId: message.parentMessageId,
      createdBy: message.createdBy,
      _id: { $ne: message._id },
    });

    // If not, remove the user from threadParticipants
    if (!otherReplies) {
      await Message.findByIdAndUpdate(message.parentMessageId, {
        $pull: { threadParticipants: message.createdBy },
      });
    }
  }

  // Delete the message
  await message.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
