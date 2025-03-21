import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/handlerFactory.js";
import Workspace from "../models/workspace.model.js";
import UserProfile from "../models/userProfile.model.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllWorkspaces = getAll(Workspace);
export const getWorkspace = getOne(Workspace);
export const createWorkspace = createOne(Workspace);
export const updateWorkspace = updateOne(Workspace);
export const deleteWorkspace = deleteOne(Workspace);

export const attchCreatedByToWorkspace = (req, res, next) => {
  req.body.createdBy = req.user.id;
  next();
};

// Adds user to workspace
export const addUserToWorkspace = catchAsync(async (req, res, next) => {
  // get the workspace id and the userProfile id from the request parameters
  const { workspaceId, userProfileId } = req.body;

  // find the workspace by the workspace id
  const workspace = await Workspace.findById(workspaceId);

  // check if the workspace exists
  if (!workspace)
    return next(new AppError("No workspace found with that ID", 404));

  // check if the userProfile is already in the workspace
  if (workspace.members.includes(userProfileId))
    return next(new AppError("User already in workspace", 400));

  // if the user is the one created the workspace -> make user the owner
  if (
    workspace.members.length === 0 &&
    workspace.createdBy.toString() === req.user.id
  ) {
    await UserProfile.findByIdAndUpdate(userProfileId, { role: "owner" });
  }

  // add the userProfile to the workspace members array
  workspace.members.push(userProfileId);
  await workspace.save();

  // add the userProfile to his workspaceProfiles array
  await User.findByIdAndUpdate(req.user.id, {
    $addToSet: { workspaceProfiles: userProfileId },
  });

  // create conversations between all the members of the workspace and the new member
  workspace.createMemberConversations();

  res.status(200).json({
    status: "success",
    data: {
      workspace,
    },
  });
});


