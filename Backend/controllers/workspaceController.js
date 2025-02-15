import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/handlerFactory.js";
import Workspace from "../models/workspaceModel.js";

export const getAllWorkspaces = getAll(Workspace);
export const getWorkspace = getOne(Workspace);
export const createWorkspace = createOne(Workspace);
export const updateWorkspace = updateOne(Workspace);
export const deleteWorkspace = deleteOne(Workspace);
