import Message from "../models/message.model.js";
import catchAsync from "../utils/catchAsync.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlerFactory.js";
import { validateResources } from "../utils/validateResources.js";

export const getAllMessages = getAll(Message);
export const getMessage = getOne(Message);
export const updateMessage = updateOne(Message);
export const deleteMessage = deleteOne(Message);

// export const createMessage = createOne(Message);
export const createMessage = catchAsync(async (req, res, next) => {
  if (req.params.channelId) req.body.channelId = req.params.channelId;
  if (req.params.conversationId) req.body.channelId = req.params.conversationId;

  const doc = await Message.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

export const validateMessageData = catchAsync(
  validateResources([
    {
      model: "Workspace",
      field: "workspaceId",
      value: "req.body.workspaceId",
    },
    {
      model: "Channel",
      field: "channelId",
      value: "req.body.channelId",
    },
    {
      model: "Conversation",
      field: "conversationId",
      value: "req.body.conversationId",
    },
  ])
);
