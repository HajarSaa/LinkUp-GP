import { getAll } from "../utils/handlerFactory.js";
import Workspace from "../models/workspace.model.js";
import UserProfile from "../models/userProfile.model.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllWorkspaces = getAll(Workspace);

export const createWorkspace = catchAsync(async (req, res, next) => {
  // Attach data into request body
  req.body.createdBy = req.user.id;

  const workspace = await Workspace.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      workspace,
    },
  });
});

// export const joinWorkspace = catchAsync(async (req, res, next) => {
//   // Check if the user is already a member of the workspace
//   let userProfile = await UserProfile.findOne({
//     user: req.user.id,
//     workspace: req.params.id,
//   });
//   if (userProfile) {
//     return next(new AppError("User already in workspace", 400));
//   }

//   // Create the userProfile
//   req.body.user = req.user.id;
//   req.body.email = req.user.email;
//   req.body.workspace = req.params.id;
//   userProfile = await UserProfile.create(req.body);
//   const userProfileId = userProfile.id;

//   // get the workspace id and the userProfile id from the request parameters
//   const workspaceId = req.params.id;

//   // find the workspace by the workspace id
//   const workspace = await Workspace.findById(workspaceId);

//   // check if the workspace exists
//   if (!workspace)
//     return next(new AppError("No workspace found with that ID", 404));

//   // check if the userProfile is already in the workspace
//   if (workspace.members.includes(userProfileId))
//     return next(new AppError("User already in workspace", 400));

//   // if the user is the one created the workspace -> make user the owner
//   if (
//     workspace.members.length === 0 &&
//     workspace.createdBy.toString() === req.user.id
//   ) {
//     await UserProfile.findByIdAndUpdate(userProfileId, { role: "owner" });
//   }

//   // add the userProfile to the workspace members array
//   workspace.members.push(userProfileId);
//   await workspace.save();

//   // add the userProfile to his workspaceProfiles array
//   await User.findByIdAndUpdate(req.user.id, {
//     $addToSet: { workspaceProfiles: userProfileId },
//   });

//   // create conversations between all the members of the workspace and the new member
//   workspace.createMemberConversations();

//   res.status(200).json({
//     status: "success",
//     data: {
//       workspace,
//     },
//   });
// });

export const joinWorkspace = catchAsync(async (req, res, next) => {
  // find the workspace
  const workspace = await Workspace.findById(req.params.id);
  // check if the workspace exists
  if (!workspace)
    return next(new AppError("No workspace found with that ID", 404));

  // Check if the user is already a member of the workspace
  let userProfile = await UserProfile.findOne({
    user: req.user.id,
    workspace: req.params.id,
  });
  if (userProfile) {
    return next(new AppError("User already in workspace", 400));
  }

  // Create the userProfile
  req.body.user = req.user.id;
  req.body.email = req.user.email;
  req.body.workspace = req.params.id;
  userProfile = await UserProfile.create(req.body);
  const userProfileId = userProfile.id;

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

export const getWorkspace = catchAsync(async (req, res, next) => {
  const workspaceId = req.params.id;
  const workspace = await Workspace.findById(workspaceId)
    .populate({
      path: "members",
    })
    .populate("channels")
    .populate("conversations");

  // check if the workspace exists
  if (!workspace) {
    return next(
      new AppError(`Cannot find document with ID: ${workspaceId}`, 404)
    );
  }

  // check if the user is a member of the workspace
  const userProfile = await UserProfile.findOne({
    user: req.user.id,
    workspace: workspaceId,
  });

  if (!userProfile) {
    return next(new AppError("You are not a member of this workspace", 403));
  }

  // Send the workspace id as a cookie
  res.cookie("workspace", workspaceId, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  // Send the response
  res.status(200).json({
    status: "success",
    data: {
      workspace,
    },
  });
});

export const deleteWorkspace = catchAsync(async (req, res, next) => {
  const workspaceId = req.params.id;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return next(new AppError("No workspace found with that ID", 404));
  }

  // get the ids of the userProfiles
  const userProfiles = await UserProfile.find({ workspace: workspaceId });
  const userProfileIds = userProfiles.map((profile) => profile._id);

  // Remove userProfiles from users' workspaceProfiles array
  await User.updateMany(
    { workspaceProfiles: { $in: userProfileIds } },
    { $pull: { workspaceProfiles: { $in: userProfileIds } } }
  );

  // Delete the userProfiles
  await UserProfile.deleteMany({ workspace: workspaceId });

  // Delete all conversations and channels associated with the workspace
  await workspace.deleteConversationsAndChannels();

  // Delete the workspace
  await Workspace.findByIdAndDelete(workspaceId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
