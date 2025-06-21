import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import File from "../../models/file.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";
import { userConnections } from "./connection.handler.js";
import { cloudinary } from "../../config/cloudinary.js";

const MAX_MESSAGE_LENGTH = 4000;
const EDIT_WINDOW_MS = 15 * 60 * 1000;

export default function messageHandler(socket, io) {
  socket.on(
    "sendMessage",
    socketAsync(async (data, callback) => {
      const {
        content,
        channelId,
        conversationId,
        attachmentIds = [],
        parentMessageId = null,
        tempId = null,
      } = data;

      // Validate connection
      if (!socket.userId || !socket.userProfileId) {
        throw new AppError("User not connected", 401);
      }

      // Validate destination
      if (!channelId && !conversationId) {
        throw new AppError(
          "Message must belong to a channel or conversation",
          400
        );
      }

      // Validate message existence
      if (!content && attachmentIds.length === 0) {
        throw new AppError("Message must have content or attachments", 400);
      }

      // Determine messageType
      let messageType = "text";
      if (attachmentIds.length > 0 && content) {
        messageType = "mixed";
      } else if (attachmentIds.length > 0 && !content) {
        messageType = "file";
      }

      // Prepare payload
      const messagePayload = {
        content: content?.trim() || "",
        createdBy: socket.userProfileId,
        channelId: channelId || null,
        conversationId: conversationId || null,
        parentMessageId,
        attachments: attachmentIds,
        messageType,
        readBy: [socket.userProfileId],
      };

      // Check parentMessage exists if replying
      if (parentMessageId) {
        const parent = await Message.findById(parentMessageId);
        if (!parent) {
          throw new AppError("Parent message not found", 404);
        }

        // Increment thread info
        await Message.findByIdAndUpdate(parentMessageId, {
          $inc: { threadCount: 1 },
          $set: { lastRepliedAt: new Date() },
          $addToSet: { threadParticipants: socket.userProfileId },
        });
      }

      // Create message
      const message = await Message.create(messagePayload);

      // Update attached files
      if (attachmentIds.length > 0) {
        await File.updateMany(
          { _id: { $in: attachmentIds } },
          { $set: { attachedToMessage: message._id } }
        );
      }

      // Build socket payload
      const payload = {
        ...message.toObject(),
        tempId,
      };

      const room = channelId
        ? `channel:${channelId}`
        : `conversation:${conversationId}`;

      io.to(room).emit("newMessage", payload);

      // Handle thread notification (for replies)
      if (parentMessageId) {
        const involvedUserIds = new Set();

        const [parentMessage, parentFile] = await Promise.all([
          Message.findById(parentMessageId).select("createdBy"),
          File.findById(parentMessageId).select("uploadedBy"),
        ]);

        if (parentMessage) {
          involvedUserIds.add(parentMessage.createdBy.toString());
        } else if (parentFile) {
          involvedUserIds.add(parentFile.uploadedBy.toString());
        }

        const replies = await Message.find({ parentMessageId }).select(
          "createdBy"
        );
        replies.forEach((msg) => involvedUserIds.add(msg.createdBy.toString()));

        involvedUserIds.delete(socket.userId.toString());

        involvedUserIds.forEach((userId) => {
          const sockets = userConnections.get(userId);
          if (sockets) {
            sockets.forEach((sId) => {
              io.to(sId).emit("threadReply", {
                messageId: message._id,
                parentMessageId,
                content: message.content,
                repliedBy: socket.userId,
                channelId,
                conversationId,
                createdAt: message.createdAt,
              });
            });
          }
        });
      }

      callback?.({
        success: true,
        message: payload,
      });
    })
  );
  socket.on(
    "deleteMessage",
    socketAsync(async (messageId, callback) => {
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError("Invalid message ID", 400);
      }

      const message = await Message.findById(messageId);
      if (!message) throw new AppError("Message not found", 404);

      if (message.createdBy.toString() !== socket.userProfileId.toString()) {
        throw new AppError(
          "You are not authorized to delete this message",
          403
        );
      }

      // Handle thread logic
      if (message.parentMessageId) {
        // Decrement threadCount
        await Message.findByIdAndUpdate(message.parentMessageId, {
          $inc: { threadCount: -1 },
        });

        // Remove participant if this is their only reply
        const otherReplies = await Message.findOne({
          parentMessageId: message.parentMessageId,
          createdBy: message.createdBy,
          _id: { $ne: message._id },
        });

        if (!otherReplies) {
          await Message.findByIdAndUpdate(message.parentMessageId, {
            $pull: { threadParticipants: message.createdBy },
          });
        }
      }

      // Delete attached files (if any)
      if (message.attachments && message.attachments.length > 0) {
        const attachedFiles = await File.find({
          _id: { $in: message.attachments },
        });

        for (const file of attachedFiles) {
          try {
            if (file.cloudinaryId && file.cloudinaryResourceType) {
              await cloudinary.uploader.destroy(file.cloudinaryId, {
                resource_type: file.cloudinaryResourceType,
              });
            }
            await file.deleteOne();
          } catch (err) {
            console.error(`Error deleting file ${file._id}:`, err.message);
          }
        }
      }

      // Delete the message
      await message.deleteOne();

      // Determine room
      const room = message.channelId
        ? `channel:${message.channelId}`
        : `conversation:${message.conversationId}`;

      // Notify others in room
      io.to(room).emit("messageDeleted", {
        messageId: message._id,
        deletedBy: socket.userId,
      });

      callback?.({ success: true });
    })
  );

  socket.on(
    "editMessage",
    socketAsync(async ({ messageId, newContent }, callback) => {
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError("Invalid message ID format", 400);
      }

      if (typeof newContent !== "string" || !newContent.trim()) {
        throw new AppError("Message content cannot be empty", 400);
      }

      if (newContent.length > MAX_MESSAGE_LENGTH) {
        throw new AppError(
          `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`,
          400
        );
      }

      // Find message and check permission
      const message = await Message.findById(messageId);
      if (!message) throw new AppError("Message not found", 404);

      if (!message.createdBy.equals(socket.userProfileId)) {
        throw new AppError("You are not authorized to edit this message", 403);
      }

      const timeLimit = new Date(Date.now() - EDIT_WINDOW_MS);
      if (message.createdAt < timeLimit) {
        throw new AppError("Editing time window has expired", 400);
      }

      // Update content + flags
      message.content = newContent;
      message.edited = true;
      message.editedAt = new Date();
      await message.save();

      const room = message.channelId
        ? `channel:${message.channelId}`
        : `conversation:${message.conversationId}`;

      io.to(room).emit("messageEdited", {
        messageId: message._id,
        newContent: message.content,
        editedAt: message.editedAt,
        updatedAt: message.updatedAt,
      });

      callback?.({
        success: true,
        message: {
          _id: message._id,
          content: message.content,
          edited: message.edited,
          editedAt: message.editedAt,
          updatedAt: message.updatedAt,
        },
      });
    })
  );
}
