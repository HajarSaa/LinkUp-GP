import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import File from "../../models/file.model.js";
import Channel from "../../models/channel.model.js";
import Conversation from "../../models/converstion.model.js";
import UserProfile from "../../models/userProfile.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

const MODELS = {
  message: Message,
  file: File,
};

export default function pinningHandler(socket, io) {
  // pin/unpin message or file
  socket.on(
    "pinItem",
    socketAsync(async ({ type, itemId, pin }, callback) => {
      if (!["message", "file"].includes(type)) {
        throw new AppError("Invalid type, must be 'message' or 'file'", 400);
      }

      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        throw new AppError("Invalid item ID", 400);
      }

      if (typeof pin !== "boolean") {
        throw new AppError("Pin must be a boolean", 400);
      }

      const Model = MODELS[type];
      const item = await Model.findById(itemId);
      if (!item) throw new AppError(`${type} not found`, 404);

      const workspaceId = item.channelId
        ? (await Channel.findById(item.channelId)).workspaceId
        : (await Conversation.findById(item.conversationId)).workspaceId;

      const profile = await UserProfile.findOne({
        user: socket.userId,
        workspace: workspaceId,
      });
      if (!profile) throw new AppError("Unauthorized", 403);

      item.pinned = pin;
      await item.save();

      const room = item.channelId
        ? `channel:${item.channelId}`
        : `conversation:${item.conversationId}`;

      io.to(room).emit(`${type}Pinned`, {
        [`${type}Id`]: item._id,
        pinned: pin,
        updatedBy: socket.userId,
      });

      callback?.({ success: true });
    })
  );

  // get all pinned messages/files in a room
  socket.on(
    "getPinnedItems",
    socketAsync(async ({ type, channelId, conversationId }, callback) => {
      if (!["message", "file"].includes(type)) {
        throw new AppError("Invalid type, must be 'message' or 'file'", 400);
      }

      const query = { pinned: true };
      if (channelId) query.channelId = channelId;
      else if (conversationId) query.conversationId = conversationId;
      else throw new AppError("channelId or conversationId required", 400);

      const Model = MODELS[type];
      const items = await Model.find(query).lean();

      callback?.({
        success: true,
        [`${type}s`]: items,
      });
    })
  );
}
/*
PINNING HANDLER TESTING 
1. Pin a message
socket.emit(
  "pinItem",
  {
    type: "message",
    itemId: "64cfe1c2b294847adcc0f7a9", // ID الرسالة
    pin: true,
  },
  (res) => {
    if (res.success) {
      console.log("✅ Message pinned!");
    } else {
      console.error("❌ Failed to pin message:", res);
    }
  }
);
2. Unpin a Message
socket.emit(
  "pinItem",
  {
    type: "message",
    itemId: "64cfe1c2b294847adcc0f7a9",
    pin: false,
  },
  (res) => {
    if (res.success) {
      console.log("✅ Message unpinned!");
    } else {
      console.error("❌ Failed to unpin message:", res);
    }
  }
);
3. Get all pinned messages
socket.emit(
  "getPinnedItems",
  {
    type: "message",
    conversationId: "68091dfac422c24ab4fd6544" || channelId: "6809223fc422c24ab4fd6566",
  },
  (res) => {
    if (res.success) {
      console.log("📌 Pinned messages:", res.messages);
    } else {
      console.error("❌ Failed to fetch pinned messages:", res);
    }
  }
);
4. Pin a file
socket.emit(
  "pinItem",
  {
    type: "file",
    itemId: "64dfe1c2a12345abcd4567ef",
    pin: true,
  },
  (res) => {
    if (res.success) {
      console.log("📎 File pinned!");
    } else {
      console.error("❌ Failed to pin file:", res);
    }
  }
);
5. Unpin a file
socket.emit(
  "pinItem",
  {
    type: "file",
    itemId: "64dfe1c2a12345abcd4567ef",
    pin: false,
  },
  (res) => {
    if (res.success) {
      console.log("📎 File unpinned!");
    } else {
      console.error("❌ Failed to unpin file:", res);
    }
  }
);
// 6. Get all pinned files
socket.emit(
  "getPinnedItems",
  {
    type: "file",
    conversationId: "68091dfac422c24ab4fd6544" || channelId: "6809223fc422c24ab4fd6566",
  },
  (res) => {
    if (res.success) {
      console.log("📁 Pinned files in channel:", res.files);
    } else {
      console.error("❌ Error:", res);
    }
  }
);
*/
