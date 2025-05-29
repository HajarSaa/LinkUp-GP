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
  //const workspaceId = req.workspace._id;
  const userProfile = req.userProfile;

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
        uploadedBy: userProfile._id,
        channelId: channelId || null,
        conversationId: conversationId || null,
        parentId: parentId || null,
        parentType: parentType || null,
      })
    )
  );

  // prepare Socket.IO data
  const formattedFiles = files.map((file) => ({
    _id: file._id,
    url: file.fileUrl,
    originalname: file.fileName,
    mimetype: file.fileType,
    size: file.fileSize,
    uploadedBy: userProfile._id,
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
        senderProfile: {
          _id: userProfile._id,
          name: userProfile.userName,
          avatar: userProfile.photo,
        },
        timestamp: new Date().toISOString(),
        parentId: parentId || null,
        parentType: parentType || null,
      },
      (err) => {
        if (err) console.error("Socket emission failed:", err);
      }
    );
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

export const getAllFiles = catchAsync(async (req, res, next) => {
  const { conversationId, channelId } = req.query;

  if (!conversationId && !channelId) {
    return next(
      new AppError("Provide either conversationId or channelId", 400)
    );
  }

  const filter = {};
  if (conversationId) filter.conversationId = conversationId;
  if (channelId) filter.channelId = channelId;

  const files = await File.find(filter)
    .sort({ createdAt: -1 })
    .populate({
      path: "uploadedBy",
      select: "userName photo status",
      populate: {
        path: "user",
        select: "email",
      },
    });

  const formatted = files.map((file) => {
    const uploader = file.uploadedBy;
    const user = uploader?.user;

    return {
      _id: file._id,
      fileName: file.fileName,
      fileUrl: file.fileUrl,
      fileSize: file.fileSize,
      fileType: file.fileType,
      createdAt: file.createdAt,
      uploadedBy: uploader
        ? {
            _id: uploader._id,
            name: uploader.userName,
            email: user?.email,
            avatar: uploader.photo,
            status: uploader.status,
            lastActive: uploader.lastActive,
          }
        : null,
      parentId: file.parentId,
      parentType: file.parentType,
    };
  });

  res.status(200).json({
    status: "success",
    results: formatted.length,
    data: formatted,
  });
});
