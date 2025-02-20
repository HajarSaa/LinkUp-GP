import Conversation from "../models/converstion.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlerFactory.js";

export const getAllConversations = getAll(Conversation);
export const getConversation = getOne(Conversation);
export const createConversation = createOne(Conversation);
export const updateConversation = updateOne(Conversation);
export const deleteConversation = deleteOne(Conversation);
