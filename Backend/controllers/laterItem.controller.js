import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import LaterItem from "../models/laterItem.model.js";
import Workspace from "../models/workspace.model.js";
import Message from "../models/message.model.js";

export const toggleSaveForLater = catchAsync(async (req, res, next) => {
  const { id: messageId } = req.params;
  const userProfileId = req.userProfile.id;
  const workspaceId = req.workspace.id;

  const message = await Message.findById(messageId);
  if (!message) return next(new AppError("Message not found", 404));

  // Check if already saved
  const existing = await LaterItem.findOne({
    userProfile: userProfileId,
    messageId,
  });

  if (existing) {
    await existing.deleteOne();
    return res.status(200).json({
      status: "success",
      action: "removed",
      data: { messageId },
    });
  }

  const saved = await LaterItem.create({
    userProfile: userProfileId,
    workspaceId,
    messageId,
    status: "in-progress",
    savedAt: new Date(),
  });

  res.status(201).json({
    status: "success",
    action: "saved",
    data: {
      messageId: saved.messageId,
    },
  });
});

export const updateLaterItemStatus = catchAsync(async (req, res, next) => {
  const { id: messageId } = req.params;
  const { status } = req.body;
  const userProfileId = req.userProfile.id;

  const VALID_STATUSES = ["in-progress", "completed"];
  if (!VALID_STATUSES.includes(status)) {
    return next(new AppError("Invalid status value", 400));
  }

  const item = await LaterItem.findOneAndUpdate(
    { messageId, userProfile: userProfileId },
    { $set: { status } },
    { new: true }
  );

  if (!item) return next(new AppError("Later item not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      messageId,
      status,
    },
  });
});

export const setLaterReminder = catchAsync(async (req, res, next) => {
  const { id: messageId } = req.params;
  const { reminderAt } = req.body;

  if (!reminderAt || isNaN(new Date(reminderAt))) {
    return next(new AppError("Invalid reminder date", 400));
  }

  const updated = await LaterItem.findOneAndUpdate(
    {
      userProfile: req.userProfile.id,
      messageId,
    },
    { $set: { reminderAt: new Date(reminderAt) } },
    { new: true }
  );

  if (!updated) return next(new AppError("Later item not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      messageId,
      reminderAt: updated.reminderAt,
    },
  });
});

export const removeLaterReminder = catchAsync(async (req, res, next) => {
  const { id: messageId } = req.params;

  const updated = await LaterItem.findOneAndUpdate(
    {
      messageId,
      userProfile: req.userProfile.id,
    },
    { $set: { reminderAt: null } },
    { new: true }
  );

  if (!updated) return next(new AppError("Later item not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      messageId,
      reminderRemoved: true,
    },
  });
});

export const getLaterItems = catchAsync(async (req, res, next) => {
  const workspaceId = req.workspace.id;

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return next(new AppError("No workspace found with that ID", 404));
  }

  // Find all later items for the workspace
  const laterItems = await LaterItem.find({
    workspaceId,
    userProfile: req.userProfile.id,
  })
    .populate({
      path: "messageId",
      populate: {
        path: "createdBy attachments",
        select: "userName photo fileName fileType fileUrl",
      },
    })
    .sort({ savedAt: -1 });

  const enhancedItems = laterItems.map((item) => {
    const msg = item.messageId;

    return {
      _id: item._id,
      workspaceId: item.workspaceId,
      userProfile: item.userProfile,
      message: msg
        ? {
            _id: msg._id,
            content: msg.content,
            messageType: msg.messageType,
            createdBy: msg.createdBy,
            attachments: msg.attachments,
            createdAt: msg.createdAt,
            forwarded: msg.forwarded,
            savedForLater: true,
          }
        : null,
      status: item.status,
      reminderAt: item.reminderAt,
      savedAt: item.savedAt,
      notified: item.notified,
    };
  });

  res.status(200).json({
    status: "success",
    results: enhancedItems.length,
    data: {
      laterItems: enhancedItems,
    },
  });
});
