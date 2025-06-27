import Message from "../../models/message.model.js";
import Channel from "../../models/channel.model.js";
import Conversation from "../../models/converstion.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

export default function forwardingHandler(socket, io) {
  socket.on(
    "forwardMessage",
    socketAsync(async ({ originalMessageId, targets }, callback) => {
      if (!socket.userProfileId || !socket.workspaceId || !socket.userId) {
        throw new AppError("Unauthorized", 401);
      }

      if (
        !originalMessageId ||
        !Array.isArray(targets) ||
        targets.length === 0
      ) {
        throw new AppError("Invalid forward request", 400);
      }

      const originalMessage = await Message.findById(originalMessageId);
      if (!originalMessage) {
        throw new AppError("Original message not found", 404);
      }

      const forwardedMessages = [];

      for (const target of targets) {
        const { type, id } = target;

        if (type === "channel") {
          const channel = await Channel.findById(id);
          if (!channel) continue;
          if (!channel.members.includes(socket.userProfileId)) continue;

          const newMessage = await Message.create({
            content: originalMessage.content,
            attachments: originalMessage.attachments,
            createdBy: socket.userProfileId,
            messageType: originalMessage.messageType,
            forwarded: true,
            channelId: id,
          });

          forwardedMessages.push(newMessage);
          io.to(`channel:${id}`).emit("newMessage", { message: newMessage });
        } else if (type === "conversation") {
          const conv = await Conversation.findById(id);
          if (
            !conv ||
            ![
              conv.memberOneId.toString(),
              conv.memberTwoId.toString(),
            ].includes(socket.userProfileId.toString())
          )
            continue;

          const newMessage = await Message.create({
            content: originalMessage.content,
            attachments: originalMessage.attachments,
            createdBy: socket.userProfileId,
            messageType: originalMessage.messageType,
            forwarded: true,
            conversationId: id,
          });

          forwardedMessages.push(newMessage);
          io.to(`conversation:${id}`).emit("newMessage", {
            message: newMessage,
          });
        }
      }

      callback?.({ success: true, count: forwardedMessages.length });
    })
  );
}
