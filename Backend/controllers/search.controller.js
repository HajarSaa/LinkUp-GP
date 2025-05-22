import mongoose from "mongoose";
import Message from "../models/message.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const searchMessages = catchAsync(async (req, res, next) => {
  const { keyword, user, channel, startDate, endDate } = req.query;
  const query = {};

  // Keyword search
  if (keyword) {
    query.content = { $regex: keyword, $options: "i" };
  }

  // Filter by user (using createdBy field)
  if (user) {
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return next(new AppError("Invalid user ID format", 400));
    }
    query.createdBy = new mongoose.Types.ObjectId(user);
  }

  // Filter by channel (using channelId field)
  if (channel) {
    if (!mongoose.Types.ObjectId.isValid(channel)) {
      return next(new AppError("Invalid channel ID format", 400));
    }
    query.channelId = new mongoose.Types.ObjectId(channel);
  }

  // Date range filter
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  //   console.log("Final query:", query); // For debugging

  // Execute the query
  const results = await Message.find(query)
    .sort({ createdAt: -1 })
    .populate("createdBy", "username email")
    .populate("channelId", "name");

  // Check if any messages were found
  if (!results) {
    return next(new AppError("No messages found matching the criteria.", 404));
  }

  // send response
  res.status(200).json({
    status: "success",
    results: results.length,
    data: {
      messages: results,
    },
  });
});
