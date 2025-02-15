import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/handlerFactory.js";
import User from "../models/userModel.js";

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const createUser = createOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
