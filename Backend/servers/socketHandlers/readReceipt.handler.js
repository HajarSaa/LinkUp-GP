import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import UserProfile from "../../models/userProfile.model.js";
import Channel from "../../models/channel.model.js";
import Conversation from "../../models/converstion.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

export default function readReceiptHandler(socket, io) {
  socket.on(
    "markAsRead",
    socketAsync(async ({ messageIds, userId }, callback) => {
      const messageIdArray = Array.isArray(messageIds)
        ? messageIds
        : [messageIds];
      if (messageIdArray.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
        throw new AppError("Invalid message ID(s)", 400);
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user ID", 400);
      }

      // update messages in bulk --> better performance

      const { modifiedCount } = await Message.updateMany(
        { _id: { $in: messageIdArray } },
        { $addToSet: { readBy: userId } }
      );

      if (modifiedCount === 0) {
        throw new AppError("No messages were marked as read", 404);
      }

      const updatedMessages = await Message.find({
        _id: { $in: messageIdArray },
      }).lean();

      const broadcastPromises = updatedMessages.map(async (message) => {
        const room = message.channelId
          ? `channel:${message.channelId}`
          : `conversation:${message.conversationId}`;

        const workspaceId = message.channelId
          ? (
              await Channel.findById(message.channelId)
                .select("workspaceId")
                .lean()
            ).workspaceId
          : (
              await Conversation.findById(message.conversationId)
                .select("workspaceId")
                .lean()
            ).workspaceId;

        const readByUsers = await UserProfile.find({
          user: { $in: message.readBy },
          workspace: workspaceId,
        }).lean();

        io.to(room).emit("messageRead", {
          messageId: message._id,
          readBy: readByUsers.map((user) => ({
            userId: user.user._id,
            timestamp: new Date(),
          })),
        });
      });

      await Promise.all(broadcastPromises);

      callback?.({ success: true, modifiedCount });
    })
  );
}
