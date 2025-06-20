import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

export default function readReceiptHandler(socket, io) {
  socket.on(
    "markAsRead",
    socketAsync(async ({ messageIds }, callback) => {
      const profileId = socket.userProfileId;
      const userId = socket.userId;

      if (!profileId || !userId) {
        throw new AppError("User is not connected properly", 401);
      }

      const messageIdArray = Array.isArray(messageIds)
        ? messageIds
        : [messageIds];

      if (messageIdArray.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
        throw new AppError("Invalid message ID(s)", 400);
      }

      // Update messages in bulk
      await Message.updateMany(
        { _id: { $in: messageIdArray } },
        { $addToSet: { readBy: profileId } }
      );

      const updatedMessages = await Message.find({
        _id: { $in: messageIdArray },
      }).lean();

      const now = new Date();

      const broadcastPromises = updatedMessages.map(async (message) => {
        const readPayload = {
          messageId: message._id,
          readBy: [
            {
              profileId,
              userId,
              timestamp: now,
            },
          ],
          readCount:
            message.readBy.length +
            (message.readBy.includes(profileId) ? 0 : 1),
        };

        if (message.channelId) {
          io.to(`channel:${message.channelId}`).emit(
            "messageRead",
            readPayload
          );
        } else if (message.conversationId && message.createdBy) {
          io.to(`user:${message.createdBy}`).emit("messageRead", readPayload);
        }
      });

      await Promise.all(broadcastPromises);

      callback?.({ success: true });
    })
  );
}
