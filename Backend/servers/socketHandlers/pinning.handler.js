import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import Channel from "../../models/channel.model.js";
import Conversation from "../../models/converstion.model.js";
import UserProfile from "../../models/userProfile.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

export default function pinningHandler(socket, io) {
  // Pin or unpin a message
  socket.on(
    "pinMessage",
    socketAsync(async ({ messageId, pin }, callback) => {
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError("Invalid message ID", 400);
      }

      if (typeof pin !== "boolean") {
        throw new AppError("Pin must be a boolean", 400);
      }

      const message = await Message.findById(messageId);
      if (!message) {
        throw new AppError("Message not found", 404);
      }

      const workspaceId = message.channelId
        ? (await Channel.findById(message.channelId)).workspaceId
        : (await Conversation.findById(message.conversationId)).workspaceId;

      const profile = await UserProfile.findOne({
        user: socket.userId,
        workspace: workspaceId,
      });
      if (!profile) throw new AppError("Unauthorized", 403);

      message.pinned = pin;
      await message.save();

      const room = message.channelId
        ? `channel:${message.channelId}`
        : `conversation:${message.conversationId}`;

      io.to(room).emit("messagePinned", {
        messageId: message._id,
        pinned: pin,
        updatedBy: socket.userId,
      });

      callback?.({ success: true });
    })
  );

  // Get all pinned messages in a room
  socket.on(
    "getPinnedMessages",
    socketAsync(async ({ channelId, conversationId }, callback) => {
      const query = { pinned: true };
      if (channelId) query.channelId = channelId;
      else if (conversationId) query.conversationId = conversationId;
      else throw new AppError("channelId or conversationId required", 400);

      const messages = await Message.find(query).lean();

      callback?.({
        success: true,
        messages,
      });
    })
  );
}
