import File from "../models/file.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// Upload files
export const uploadFile = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(new AppError("No files uploaded!", 400));
  }

  const { workspaceId, channelId, conversationId, parentMessageId } = req.body;

  // Create array of file objects
  const files = await Promise.all(
    req.files.map(async (file) => {
      const fileUrl = file.path;

      return await File.create({
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        fileUrl: fileUrl,
        uploadedBy: req.user.id,
        workspaceId,
        channelId: channelId || null,
        conversationId: conversationId || null,
        parentMessageId: parentMessageId || null,
        parentType: parentMessageId ? "Message" : null,
      });
    })
  );

  return res.status(201).json({
    message: "Files uploaded successfully!",
    files,
  });
});
