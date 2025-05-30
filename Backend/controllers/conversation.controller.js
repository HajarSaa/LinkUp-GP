import Conversation from "../models/converstion.model.js";
import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll } from "../utils/handlerFactory.js";

export const getAllConversations = getAll(Conversation);

export const getConversation = catchAsync(async (req, res, next) => {
  const conversationId = req.params.id;

  const conversation = await Conversation.findById(conversationId);

  // Check if the conversation exists
  if (!conversation) {
    return next(new AppError("No conversation found with that ID", 404));
  }

  // Send the response
  res.status(200).json({
    status: "success",
    data: { conversation },
  });
});
