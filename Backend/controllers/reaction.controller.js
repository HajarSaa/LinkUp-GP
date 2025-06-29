import mongoose from "mongoose";
import Message from "../models/message.model.js";
import Reaction from "../models/reaction.model.js";
import Notification from "../models/notification.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const creatReaction = catchAsync(async (req, res, next) => {
  const messageId = req.params.id;
  const userProfileId = req.user.id;
  const { emoji } = req.body;

  // Check if the message exists
  const message = await Message.findById(messageId);
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Validate the emoji
  if (!emoji) {
    return next(new AppError("Emoji is reuired", 400));
  }
  if (typeof emoji !== "string" || emoji.length === 0) {
    return next(new AppError("Invalid emoji format", 400));
  }

  // Check if the reaction already exists
  const existingReaction = await Reaction.findOne({
    messageId,
    createdBy: userProfileId,
    emoji,
  });

  if (existingReaction) {
    await existingReaction.deleteOne();
    return res.status(200).json({ message: "Reaction removed" });
  }

  // Create a new reaction
  const newReaction = await Reaction.create({
    messageId,
    createdBy: userProfileId,
    emoji,
  });
  // notification if reacting to someone's message
  if (message.createdBy.toString() !== userProfileId) {
    await Notification.create({
      type: "reaction",
      recipient: message.createdBy,
      triggeredBy: userProfileId,
      messageId,
    });
  }

  // Send the response
  res.status(201).json({
    status: "success",
    data: {
      reaction: newReaction,
    },
  });
});

export const getReactions = catchAsync(async (req, res, next) => {
  const messageId = req.params.id;

  // Check if the message exists
  const message = await Message.findById(messageId);
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Get grouped reactions for the message
  const reactions = await Reaction.find({ messageId }).sort({ createdAt: 1 });

  // Group reactions by emoji
  const groupedReactions = reactions.reduce((acc, reaction) => {
    const emoji = reaction.emoji;
    if (!acc[emoji]) {
      acc[emoji] = {
        // emoji,
        count: 0,
        UserProfiles: [],
      };
    }
    acc[emoji].count++;
    acc[emoji].UserProfiles.push({
      id: reaction.createdBy.toString(),
    });
    return acc;
  }, {});

  // Send the response
  res.status(200).json({
    status: "success",
    data: {
      groupedReactions,
    },
  });
});

export const deleteReaction = catchAsync(async (req, res, next) => {
  const messageId = req.params.id;
  const userProfileId = req.user.id;
  const { emoji } = req.body;

  console.log(messageId, userProfileId, emoji);
  // Check if the reaction exists
  const reaction = await Reaction.findOne({
    messageId,
    createdBy: userProfileId,
    emoji,
  });
  if (!reaction) {
    return next(
      new AppError("No reaction found with this emoji for this message", 404)
    );
  }

  // Check if the reaction was created by the user
  if (reaction.createdBy.toString() !== userProfileId) {
    return next(new AppError("You can only delete your own reactions", 403));
  }

  // Delete the reaction
  await reaction.deleteOne();

  // Send the response
  res.status(200).json({ message: "Reaction removed" });
});
