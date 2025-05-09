import mongoose from "mongoose";
import File from "../models/file.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const formatFile = (file) => ({
  _id: file._id,
  fileName: file.fileName,
  fileUrl: file.fileUrl,
  fileSize: file.fileSize,
  fileType: file.fileType,
  createdAt: file.createdAt,
});

// Upload files
export const uploadFile = catchAsync(async (req, res, next) => {
  // Check if files are uploaded
  if (!req.files || req.files.length === 0) {
    return next(new AppError("No files uploaded!", 400));
  }
  // Optional fields for future use (Postman testing only)
  // const { workspaceId, parentMessageId } = req.body;
  const { userId, conversationId, channelId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  if (conversationId && !mongoose.Types.ObjectId.isValid(conversationId)) {
    return next(new AppError("Invalid conversation ID", 400));
  }

  if (channelId && !mongoose.Types.ObjectId.isValid(channelId)) {
    return next(new AppError("Invalid channel ID", 400));
  }

  // Optional fields for future use (e.g. Postman testing only)
  // if (workspaceId && !mongoose.Types.ObjectId.isValid(workspaceId)) {
  //   return next(new AppError("Invalid workspace ID", 400));
  // }

  // if (parentMessageId && !mongoose.Types.ObjectId.isValid(parentMessageId)) {
  //   return next(new AppError("Invalid parent message ID", 400));
  // }

  // // Log received data
  // console.log("Files received:", req.files);
  // console.log("User ID:", userId);
  // console.log("Body:", req.body);

  // Create file documents in the database
  const files = await Promise.all(
    req.files.map((file) => {
      return File.create({
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        fileUrl: file.path, // Cloudinary
        uploadedBy: userId,
        channelId: channelId || null,
        conversationId: conversationId || null,
        // parentMessageId: parentMessageId || null,
        // parentType: parentMessageId ? "Message" : null,
      });
    })
  );

  // Emit real time event using Socket.IO
  const io = req.app.get("io");
  const roomId = conversationId || channelId;

  // Only emit event if the roomId valid
  if (io && mongoose.Types.ObjectId.isValid(roomId)) {
    io.to(roomId.toString()).emit("newFile", {
      files: files.map(formatFile),
      senderId: userId,
    });
  }

  // return response to frontend
  return res.status(201).json({
    message: "Files uploaded successfully!",
    files: files.map(formatFile),
  });
});
