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

export const uploadFile = catchAsync(async (req, res, next) => {
  // Validate files exist
  if (!req.files || req.files.length === 0) {
    return next(new AppError("No files uploaded!", 400));
  }

  // extract and validate data
  const userId = req.user.id;
  const { conversationId, channelId, parentId, parentType } = req.body;

  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  if (conversationId && !mongoose.Types.ObjectId.isValid(conversationId)) {
    return next(new AppError("Invalid conversation ID", 400));
  }

  if (channelId && !mongoose.Types.ObjectId.isValid(channelId)) {
    return next(new AppError("Invalid channel ID", 400));
  }

  if (parentId && !mongoose.Types.ObjectId.isValid(parentId)) {
    return next(new AppError("Invalid parent ID", 400));
  }

  if (parentType && !["Message", "File"].includes(parentType)) {
    return next(
      new AppError("Invalid parentType — must be 'Message' or 'File'", 400)
    );
  }

  // create files in database
  const files = await Promise.all(
    req.files.map((file) =>
      File.create({
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        fileUrl: file.path,
        uploadedBy: userId,
        channelId: channelId || null,
        conversationId: conversationId || null,
        parentId: parentId || null,
        parentType: parentType || null,
      })
    )
  );

  // prepare Socket.IO data
  const formattedFiles = files.map((file) => ({
    url: file.fileUrl,
    originalname: file.fileName,
    mimetype: file.fileType,
    size: file.fileSize,
  }));

  // handle Socket.IO emission
  const io = req.app.get("io");
  const roomId = conversationId || channelId;

  if (io && roomId) {
    const roomType = conversationId ? "conversation" : "channel";
    const fullRoomId = `${roomType}:${roomId}`;

    io.to(fullRoomId).emit(
      "fileShared",
      {
        room: fullRoomId,
        file: formattedFiles[0],
        files: formattedFiles,
        senderId: userId,
        timestamp: new Date().toISOString(),
        parentId: parentId || null,
        parentType: parentType || null,
      },
      (err) => {
        if (err) {
          console.error("Socket emission failed:", err);
        } else {
          console.log(`Emitted to ${fullRoomId}`);
        }
      }
    );
  } else {
    console.warn(io ? "No room specified" : "Socket.IO not available");
  }

  res.status(200).json({
    status: "success",
    message:
      files.length === 1
        ? "File uploaded successfully!"
        : `${files.length} files uploaded successfully!`,
    data: files.map(formatFile),
  });
});
