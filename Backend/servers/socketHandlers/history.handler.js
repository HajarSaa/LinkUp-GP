import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

export default function historyHandler(socket) {
  socket.on(
    "getMessageHistory",
    socketAsync(async ({ roomId, type, before, limit = 50 }, callback) => {
      const query = {
        [type === "channel" ? "channelId" : "conversationId"]: roomId,
        ...(before && { createdAt: { $lt: new Date(before) } }),
      };

      const messages = await Message.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

      callback({ success: true, messages });
    })
  );
}

/// NEEDS MODIFICATIONS
