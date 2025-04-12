import Conversation from "../models/converstion.model.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll } from "../utils/handlerFactory.js";

export const getAllConversations = getAll(Conversation);

export const getConversation = catchAsync(async (req, res, next) => {
  const conversationId = req.params.id;

  // Find the conversation and populate the virtual "messages" field
  const conversation = await Conversation.findById(conversationId).populate(
    "messages"
  );

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
