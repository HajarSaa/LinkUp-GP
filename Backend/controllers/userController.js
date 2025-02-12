import { createOne, getAll } from "../utils/handlerFactory.js";
import User from "../models/userModel.js";

export const createUser = createOne(User);

export const getAllUsers = getAll(User);
