import Conversation from "../models/converstion.model.js";
import File from "../models/file.model.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const { workspaceId, channelId, conversationId, parentMessageId } =
      req.body;

    const fileUrl = req.file.path;
    console.log(req.file);
    const file = new File({
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      fileUrl: fileUrl,
      uploadedBy: req.user._id,
      workspaceId,
      channelId: channelId || null,
      conversationId: conversationId || null,
      parentMessageId: parentMessageId || null,
      parentType: parentMessageId ? "Message" : null,
    });

    await file.save();
    await conversation.res.status(201).json({
      message: "File uploaded successfully!",
      file,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};
