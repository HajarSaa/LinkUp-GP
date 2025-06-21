import mongoose from "mongoose";
import File from "../models/file.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { cloudinary } from "../config/cloudinary.js";

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
  const { conversationId, channelId, parentMessageId } = req.body;
  //const workspaceId = req.workspace._id;
  const userProfile = req.userProfile;

  if (conversationId && !mongoose.Types.ObjectId.isValid(conversationId)) {
    return next(new AppError("Invalid conversation ID", 400));
  }

  if (channelId && !mongoose.Types.ObjectId.isValid(channelId)) {
    return next(new AppError("Invalid channel ID", 400));
  }

  if (parentMessageId && !mongoose.Types.ObjectId.isValid(parentMessageId)) {
    return next(new AppError("Invalid parent ID", 400));
  }

  // create files in database
  const files = await Promise.all(
    req.files.map((file) =>
      File.create({
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        fileUrl: file.path,
        cloudinaryId: file.filename,
        cloudinaryResourceType: file.mimetype.startsWith("image/")
          ? "image"
          : file.mimetype.startsWith("video/")
          ? "video"
          : "raw",
        uploadedBy: userProfile._id,
        channelId: channelId || null,
        conversationId: conversationId || null,
        parentMessageId: parentMessageId || null,
        attachedToMessage: null,
        pinned: false,
      })
    )
  );

  res.status(200).json({
    status: "success",
    message:
      files.length === 1
        ? "File uploaded successfully!"
        : ` ${files.length} files uploaded successfully!`,
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
      parentMessageId: file.parentMessageId,
    };
  });

  res.status(200).json({
    status: "success",
    results: formatted.length,
    data: formatted,
  });
});

export const deleteFile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userProfile = req.userProfile;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid file ID", 400));
  }

  const file = await File.findById(id);
  if (!file) {
    return next(new AppError("File not found", 404));
  }

  if (!file.uploadedBy.equals(userProfile._id)) {
    return next(
      new AppError("You are not authorized to delete this file", 403)
    );
  }

  // remove from cloudinary using stored metadata
  if (file.cloudinaryId && file.cloudinaryResourceType) {
    console.log(" Deleting from Cloudinary:", {
      publicId: file.cloudinaryId,
      resourceType: file.cloudinaryResourceType,
    });

    const result = await cloudinary.uploader.destroy(file.cloudinaryId, {
      resource_type: file.cloudinaryResourceType,
    });

    console.log("Cloudinary delete result:", result);
  }

  // remove from MongoDB
  await file.deleteOne();

  res.status(200).json({
    status: "success",
    message: "File deleted successfully",
  });
});
