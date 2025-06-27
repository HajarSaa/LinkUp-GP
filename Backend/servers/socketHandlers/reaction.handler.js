import mongoose from "mongoose";
import Reaction from "../../models/reaction.model.js";
import Message from "../../models/message.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

export default function reactionHandler(socket, io) {
  socket.on(
    "toggleReaction",
    socketAsync(async ({ messageId, emoji }, callback) => {
      const userProfileId = socket.userProfileId;

      // Validate inputs
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError("Invalid message ID", 400);
      }

      if (!emoji || typeof emoji !== "string") {
        throw new AppError("Invalid emoji", 400);
      }

      // Check if message exists
      const message = await Message.findById(messageId);
      if (!message) throw new AppError("Message not found", 404);

      // Check if reaction already exists
      const existingReaction = await Reaction.findOne({
        messageId,
        createdBy: userProfileId,
        emoji,
      });

      let action;

      if (existingReaction) {
        await existingReaction.deleteOne();
        action = "removed";
      } else {
        await Reaction.create({
          messageId,
          createdBy: userProfileId,
          emoji,
        });
        action = "added";
      }

      // Determine room name
      const room = message.channelId
        ? `channel:${message.channelId}`
        : `conversation:${message.conversationId}`;

      // Emit to all room members
      io.to(room).emit("reactionUpdated", {
        messageId,
        emoji,
        // userId: socket.userId,
        userId: socket.userProfileId,
        action, // "added" or "removed"
      });

      callback?.({ success: true, action });
    })
  );
  socket.on(
    "getMessageReactions",
    socketAsync(async ({ messageId }, callback) => {
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError("Invalid message ID", 400);
      }

      const reactions = await Reaction.find({ messageId }).sort({
        createdAt: 1,
      });

      const groupedReactions = reactions.reduce((acc, reaction) => {
        const emoji = reaction.emoji;
        if (!acc[emoji]) {
          acc[emoji] = {
            count: 0,
            userIds: [],
          };
        }
        acc[emoji].count++;
        acc[emoji].userIds.push(reaction.createdBy.toString());
        return acc;
      }, {});

      callback?.({
        success: true,
        messageId,
        groupedReactions,
      });
    })
  );
}
