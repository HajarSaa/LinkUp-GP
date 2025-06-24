import { getAll } from "../utils/handlerFactory.js";
import Workspace from "../models/workspace.model.js";
import UserProfile from "../models/userProfile.model.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { isValidPhoneNumber } from "libphonenumber-js";
import Channel from "../models/channel.model.js";

export const getAllWorkspaces = getAll(Workspace);

export const createWorkspace = catchAsync(async (req, res, next) => {
  // Attach data into request body
  req.body.createdBy = req.user.id;

  const workspace = await Workspace.create(req.body);

  // Create a general channel for all members to be in
  const defaultChannel = {
    name: "General",
    type: "public",
    description: "General channel for all members",
    createdBy: req.user.id,
    workspaceId: workspace.id,
    required: true,
  };

  await Channel.create(defaultChannel);

  res.status(201).json({
    status: "success",
    data: {
      workspace,
    },
  });
});

export const joinWorkspace = catchAsync(async (req, res, next) => {
  const io = req.app.get("io");

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

  // phone number validation
  if (req.body.phoneNumber && !isValidPhoneNumber(req.body.phoneNumber)) {
    return next(new AppError("Invalid phone number", 400));
  }

  // Create the userProfile
  req.body.user = req.user.id;
  req.body.email = req.user.email;
  req.body.workspace = req.params.id;

  // handle avatar if uploaded
  if (req.file && req.file.path) {
    req.body.photo = req.file.path;
  }

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

  // emit socket event to other members in workspace
  io.to(`workspace:${workspace._id}`).emit("workspaceMemberJoined", {
    userId: req.user.id,
    profile: {
      _id: userProfile._id,
      name: userProfile.userName,
      avatar: userProfile.photo,
    },
    joinedAt: new Date(),
  });

  // general channel
  const channel = await Channel.findOne({
    workspaceId: workspace.id,
    required: true,
  });

  // edit the default channel createdBy to be the userProfile id
  const generalChannelCreater = await UserProfile.findById(channel.createdBy);
  if (!generalChannelCreater) {
    channel.createdBy = userProfileId;
  }
  // add the userProfile to the general channel
  channel.members.push(userProfileId);

  // save the channel
  await channel.save();

  // Send the response
  res.status(200).json({
    status: "success",
    data: {
      workspace,
    },
  });
});

export const getWorkspace = catchAsync(async (req, res, next) => {
  const workspaceId = req.params.id;

  let workspace = await Workspace.findById(workspaceId);
  // check if the workspace exists
  if (!workspace) {
    return next(
      new AppError(`Cannot find workspace with ID: ${workspaceId}`, 404)
    );
  }

  // First find the user's profile in this workspace
  const userProfile = await UserProfile.findOne({
    user: req.user.id,
    workspace: workspaceId,
  });

  if (!userProfile) {
    return next(new AppError("You are not a member of this workspace", 403));
  }

  // Get the workspace with populated data
  workspace = await Workspace.findById(workspaceId)
    .populate({
      path: "members",
    })
    .populate({
      path: "channels",
      // Remove the match condition from here
    })
    .populate("conversations");

  // check if the workspace exists
  if (!workspace) {
    return next(
      new AppError(`Cannot find workspace with ID: ${workspaceId}`, 404)
    );
  }

  // Filter channels manually to ensure accuracy
  const filteredChannels = workspace.channels.filter((channel) => {
    // Check if the user's profile ID is in the channel's members array
    return (
      channel.members &&
      channel.members.some(
        (memberId) => memberId.toString() === userProfile._id.toString()
      )
    );
  });

  // Filter conversations to only include those where the user is a member
  const filteredConversations = workspace.conversations.filter(
    (conversation) => {
      return (
        conversation.memberOneId._id.equals(userProfile._id) ||
        conversation.memberTwoId._id.equals(userProfile._id)
      );
    }
  );

  // Replace the arrays with filtered ones
  workspace.channels = filteredChannels;
  workspace.conversations = filteredConversations;

  // Send the workspace id as a cookie
  res.cookie("workspace", workspaceId, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  // Send the response
  res.status(200).json({
    status: "success",
    data: {
      workspace,
      userId: req.user.id,
      userProfileId: userProfile.id,
    },
  });
});

export const leaveWorkspace = catchAsync(async (req, res, next) => {
  const workspaceId = req.params.id;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return next(new AppError("No workspace found with that ID", 404));
  }

  // Find the user's profile in this workspace
  const userProfile = await UserProfile.findById(req.userProfile.id);

  if (!userProfile) {
    return next(new AppError("You are not a member of this workspace", 403));
  }

  // Remove the userProfile from the workspace members array
  workspace.members.pull(userProfile._id);
  await workspace.save();

  // Remove the userProfile from the user's workspaceProfiles array
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { workspaceProfiles: userProfile._id },
  });

  // Delete all conversations  between all the members of the workspace and the  userProfile
  await workspace.deleteMemberConversations(userProfile._id);

  // Remove the userProfile from all channels in the workspace
  await Channel.updateMany(
    { workspaceId: workspace._id },
    { $pull: { members: userProfile._id } }
  );

  // Delete the userProfile
  await UserProfile.findByIdAndDelete(userProfile._id);

  // emit socket event to notify all members that a member left
  const io = req.app.get("io");
  io.to(`workspace:${workspaceId}`).emit("workspaceMemberLeft", {
    userId: req.user.id,
    profileId: userProfile._id,
    leftAt: new Date(),
  });

  // Send the response
  res.status(200).json({
    status: "success",
    message: "Successfully left the workspace",
    data: {
      workspaceId: workspace.id,
      workspaceName: workspace.name,
    },
  });
});

export const updateWorkspace = catchAsync(async (req, res, next) => {
  const io = req.app.get("io");
  const workspaceId = req.params.id;

  const { name } = req.body;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return next(new AppError("No workspace found with that ID", 404));
  }

  // Update the workspace
  if (name) workspace.name = name;

  // Save the updates
  await workspace.save();

  // Broadcast update to all workspace members
  io.to(`workspace:${workspaceId}`).emit("workspace:updated", {
    workspaceId,
    updatedFields: { name },
    updatedAt: new Date(),
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
  // emit socket event to notify all members that workspace is deleted
  const io = req.app.get("io");
  io.to(`workspace:${workspaceId}`).emit("workspace:deleted", {
    workspaceId,
    deletedAt: new Date(),
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const signOutWorkspace = catchAsync(async (req, res, next) => {
  const workspaceId = req.workspace.id;

  // Remove the workspace cookie
  res.clearCookie("workspace", {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  // Send the response
  res.status(200).json({
    status: "success",
    message: `Successfully signed out of workspace with ID: ${workspaceId}`,
  });
});
