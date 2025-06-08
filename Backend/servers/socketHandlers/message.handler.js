import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import Conversation from "../../models/converstion.model.js";
import Channel from "../../models/channel.model.js";
import File from "../../models/file.model.js";
import UserProfile from "../../models/userProfile.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";
import { userConnections } from "./connection.handler.js";

const MAX_MESSAGE_LENGTH = 4000;
const EDIT_WINDOW_MS = 15 * 60 * 1000;
const lastMessageTimestamps = new Map();

export default function messageHandler(socket, io) {
  socket.on(
    "sendMessage",
    socketAsync(async (data, callback) => {
      const now = Date.now();
      const lastMessageTime = lastMessageTimestamps.get(socket.id) || 0;
      if (now - lastMessageTime < 1000) {
        throw new AppError(
          "Message rate limit exceeded (1 message per second)",
          429
        );
      }
      lastMessageTimestamps.set(socket.id, now);

      const {
        content,
        senderId,
        conversationId,
        channelId,
        tempId,
        parentMessageId,
        parentType,
      } = data;
      if (!content?.trim())
        throw new AppError("Message content cannot be empty", 400);
      if (!mongoose.Types.ObjectId.isValid(senderId))
        throw new AppError("Invalid sender ID", 400);
      if (tempId && typeof tempId !== "string")
        throw new AppError("Invalid tempId format", 400);

      let message, room, workspaceId, recipientId;
      const messagePayload = {
        content,
        createdBy: senderId,
        readBy: [senderId],
        metadata: { tempId },
      };

      if (conversationId) {
        const conversation = await Conversation.findById(conversationId)
          .populate("memberOneId memberTwoId")
          .lean();

        if (!conversation) throw new AppError("Conversation not found", 404);

        workspaceId = conversation.workspaceId;
        recipientId =
          conversation.memberOneId.user.toString() === senderId
            ? conversation.memberTwoId.user.toString()
            : conversation.memberOneId.user.toString();

        const senderProfile = await UserProfile.findOne({
          user: senderId,
          workspace: workspaceId,
        }).lean();
        if (!senderProfile) throw new AppError("Not in workspace", 403);

        messagePayload.conversationId = conversationId;
        if (parentMessageId) {
          messagePayload.parentMessageId = parentMessageId;
          messagePayload.parentType = parentType || "Message";
        }

        message = await Message.create(messagePayload);
        room = `conversation:${conversationId}`;
      } else if (channelId) {
        const channel = await Channel.findById(channelId)
          .select("members workspaceId type")
          .lean();

        if (!channel) throw new AppError("Channel not found", 404);
        workspaceId = channel.workspaceId;

        const senderProfile = await UserProfile.findOne({
          user: senderId,
          workspace: workspaceId,
        }).lean();
        if (!senderProfile) throw new AppError("Not in workspace", 403);

        const isMember = channel.members.some(
          (m) => m.toString() === senderId.toString()
        );
        if (!isMember && channel.type === "private") {
          throw new AppError("Not in private channel", 403);
        }

        messagePayload.channelId = channelId;
        if (parentMessageId) {
          messagePayload.parentMessageId = parentMessageId;
          messagePayload.parentType = parentType || "Message";
        }

        message = await Message.create(messagePayload);
        room = `channel:${channelId}`;
      } else {
        throw new AppError("conversationId or channelId required", 400);
      }

      const messageData = message.toObject();
      if (recipientId) messageData.recipientId = recipientId;

      const useVolatile = room.startsWith("channel:");
      const emitter = useVolatile ? socket.to(room).volatile : socket.to(room);
      emitter.emit("newMessage", messageData);

      const socketsInRoom = await io.in(room).fetchSockets();
      const deliveredTo = socketsInRoom
        .filter((s) => s.userId !== senderId)
        .map((s) => s.userId);

      if (deliveredTo.length > 0) {
        socket.emit("messageDelivered", {
          messageId: message._id,
          deliveredTo,
          timestamp: new Date(),
        });
      }

      if (message.parentMessageId) {
        const involvedUserIds = new Set();

        if (message.parentType === "File") {
          const parentFile = await File.findById(
            message.parentMessageId
          ).select("uploadedBy");
          if (parentFile) involvedUserIds.add(parentFile.uploadedBy.toString());
        } else {
          const parentMessage = await Message.findById(
            message.parentMessageId
          ).select("createdBy");
          if (parentMessage)
            involvedUserIds.add(parentMessage.createdBy.toString());
        }

        const threadReplies = await Message.find({
          parentMessageId: message.parentMessageId,
        }).select("createdBy");
        threadReplies.forEach((msg) =>
          involvedUserIds.add(msg.createdBy.toString())
        );

        involvedUserIds.delete(senderId.toString());
        const senderProfile = await UserProfile.findOne({
          user: senderId,
        }).lean();

        involvedUserIds.forEach((userId) => {
          const recipientSockets = userConnections.get(userId);
          if (recipientSockets?.size > 0) {
            recipientSockets.forEach((socketId) => {
              io.to(socketId).emit("threadReply", {
                messageId: message._id,
                parentMessageId: message.parentMessageId,
                content: message.content,
                repliedBy: senderId,
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
        message: {
          ...messageData,
          delivered: true,
          workspaceId,
        },
      });
    })
  );

  socket.on(
    "deleteMessage",
    socketAsync(async (messageId, callback) => {
      const message = await Message.findById(messageId);
      if (!message) throw new AppError("Message not found", 404);
      if (message.createdBy.toString() !== socket.userId) {
        throw new AppError("Not authorized", 403);
      }

      await Message.deleteOne({ _id: messageId });
      const room = message.channelId
        ? `channel:${message.channelId}`
        : `conversation:${message.conversationId}`;
      io.to(room).emit("messageDeleted", messageId);

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

      const message = await Message.findOne({
        _id: messageId,
        createdBy: socket.userId,
      });
      if (!message) {
        throw new AppError("Message not found or you're not the sender", 404);
      }

      const editWindowCutoff = new Date(Date.now() - EDIT_WINDOW_MS);
      if (message.createdAt < editWindowCutoff) {
        throw new AppError(
          `Message not editable (must be edited within ${
            EDIT_WINDOW_MS / 60000
          } minutes of sending)`,
          400
        );
      }

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
        edited: true,
        editedAt: message.editedAt,
        updatedAt: message.updatedAt,
      });

      const workspaceId = message.channelId
        ? (await Channel.findById(message.channelId)).workspaceId
        : (await Conversation.findById(message.conversationId)).workspaceId;

      callback?.({
        success: true,
        message: {
          ...message.toObject(),
          workspaceId,
        },
      });
    })
  );
}
