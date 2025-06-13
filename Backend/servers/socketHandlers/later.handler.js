import mongoose from "mongoose";
import LaterItem from "../../models/laterItem.model.js";
import Message from "../../models/message.model.js";
import File from "../../models/file.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

const VALID_TYPES = ["Message", "File"];
const VALID_STATUSES = ["in-progress", "completed"];

export default function laterHandler(socket, io) {
  // Toggle save/remove for later
  socket.on(
    "toggleSaveForLater",
    socketAsync(async ({ itemId, itemType }, callback) => {
      if (
        !mongoose.Types.ObjectId.isValid(itemId) ||
        !VALID_TYPES.includes(itemType)
      ) {
        throw new AppError("Invalid itemId or itemType", 400);
      }

      const removed = await LaterItem.findOneAndDelete({
        itemId,
        itemType,
        userProfile: socket.userProfileId,
      });

      if (removed) {
        io.to(`user:${socket.userId}`).emit("laterItemRemoved", {
          itemId,
          itemType,
        });
        return callback?.({ success: true, removed: true });
      }

      await LaterItem.create({
        itemId,
        itemType,
        userProfile: socket.userProfileId,
        savedBy: socket.userId,
        workspace: socket.workspaceId,
        status: "in-progress",
      });

      io.to(`user:${socket.userId}`).emit("laterItemSaved", {
        itemId,
        itemType,
      });
      callback?.({ success: true, saved: true });
    })
  );

  // Update status (like mark as done)
  socket.on(
    "markLaterItemStatus",
    socketAsync(async ({ itemId, itemType, status }, callback) => {
      if (!VALID_STATUSES.includes(status)) {
        throw new AppError("Invalid status value", 400);
      }

      const updated = await LaterItem.findOneAndUpdate(
        {
          itemId,
          itemType,
          userProfile: socket.userProfileId,
        },
        { $set: { status } },
        { new: true }
      );

      if (!updated) throw new AppError("Later item not found", 404);

      io.to(`user:${socket.userId}`).emit("laterItemStatusUpdated", {
        itemId,
        itemType,
        status,
      });

      callback?.({ success: true });
    })
  );

  // Set reminder time
  socket.on(
    "setLaterReminder",
    socketAsync(async ({ itemId, itemType, reminderAt }, callback) => {
      const updated = await LaterItem.findOneAndUpdate(
        {
          itemId,
          itemType,
          userProfile: socket.userProfileId,
        },
        { $set: { reminderAt: new Date(reminderAt) } },
        { new: true }
      );

      if (!updated) throw new AppError("Later item not found", 404);

      io.to(`user:${socket.userId}`).emit("laterReminderSet", {
        itemId,
        itemType,
        reminderAt,
      });

      callback?.({ success: true });
    })
  );

  // Get saved later items for user
  socket.on(
    "getLaterItems",
    socketAsync(async ({ status }, callback) => {
      const query = {
        userProfile: socket.userProfileId,
        ...(status && VALID_STATUSES.includes(status) && { status }),
      };

      const items = await LaterItem.find(query)
        .populate("itemId")
        .sort({ createdAt: -1 })
        .lean();

      const now = new Date();

      const enhancedItems = items.map((item) => {
        let reminderStatus = null;
        let reminderDelta = null;

        if (item.reminderAt) {
          const diff = (item.reminderAt - now) / 1000;
          reminderDelta = Math.round(diff);

          reminderStatus = diff < 0 ? "overdue" : "dueIn";
        }

        return {
          ...item,
          reminderStatus,
          reminderDelta,
        };
      });

      callback?.({ success: true, items: enhancedItems });
    })
  );
}
