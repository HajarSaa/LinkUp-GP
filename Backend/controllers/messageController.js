import Message from "../models/messageModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlerFactory.js";

export const getAllMessages = getAll(Message);
export const getMessage = getOne(Message);
export const createMessage = createOne(Message);
export const updateMessage = updateOne(Message);
export const deleteMessage = deleteOne(Message);
