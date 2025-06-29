import Notification from "../models/notification.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// get all notifications with optional filtering by type
export const getAllNotifications = catchAsync(async (req, res, next) => {
  const userProfileId = req.userProfile.id;
  const { type } = req.query;

  const filter = { recipient: userProfileId };
  if (type) {
    const allowedTypes = ["mention", "reaction", "reply"];
    if (!allowedTypes.includes(type)) {
      return next(new AppError("Invalid notification type", 400));
    }
    filter.type = type;
  }

  const notifications = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .populate("messageId");

  res.status(200).json({
    status: "success",
    results: notifications.length,
    data: {
      notifications,
    },
  });
});

// mark one notification as read
export const markNotificationAsRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: req.params.id,
      recipient: req.userProfile.id,
    },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    return next(new AppError("Notification not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      notification,
    },
  });
});

// mark all notifications as read
export const markAllNotificationsAsRead = catchAsync(async (req, res, next) => {
  await Notification.updateMany(
    { recipient: req.userProfile.id },
    { isRead: true }
  );

  res.status(200).json({
    status: "success",
    message: "All notifications marked as read",
  });
});
