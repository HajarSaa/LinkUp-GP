import Channel from "../models/channelModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/handlerFactory.js";

export const getAllChannels = getAll(Channel);
export const getChannel = getOne(Channel);
export const createChannel = createOne(Channel);
export const updateChannel = updateOne(Channel);
export const deleteChannel = deleteOne(Channel);
