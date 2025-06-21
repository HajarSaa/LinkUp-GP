import mongoose from "mongoose";
import Message from "../../models/message.model.js";
import LaterItem from "../../models/laterItem.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

const VALID_STATUSES = ["in-progress", "completed"];

export default function laterHandler(socket, io) {
  // Toggle save/remove for later
  socket.on(
    "toggleSaveForLater",
    socketAsync(async ({ messageId }, callback) => {
      if (
        !mongoose.Types.ObjectId.isValid(messageId) ||
        !socket.userId ||
        !socket.userProfileId ||
        !socket.workspaceId
      ) {
        throw new AppError("Invalid data or user not connected", 400);
      }

      const message = await Message.findById(messageId);
      if (!message) throw new AppError("Message not found", 404);

      const removed = await LaterItem.findOneAndDelete({
        userProfile: socket.userProfileId,
        messageId,
      });

      if (removed) {
        io.to(`user:${socket.userId}`).emit("laterItemRemoved", {
          messageId,
        });
        return callback?.({ success: true, removed: true });
      }

      await LaterItem.create({
        userProfile: socket.userProfileId,
        messageId,
        savedAt: new Date(),
        workspace: socket.workspaceId,
        status: "in-progress",
      });

      io.to(`user:${socket.userId}`).emit("laterItemSaved", {
        messageId,
      });

      callback?.({ success: true, saved: true });
    })
  );

  // Update status
  socket.on(
    "markLaterItemStatus",
    socketAsync(async ({ messageId, status }, callback) => {
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError("Invalid message ID", 400);
      }

      if (!VALID_STATUSES.includes(status)) {
        throw new AppError("Invalid status value", 400);
      }

      const updated = await LaterItem.findOneAndUpdate(
        {
          userProfile: socket.userProfileId,
          messageId,
        },
        { $set: { status } },
        { new: true }
      );

      if (!updated) throw new AppError("Later item not found", 404);

      io.to(`user:${socket.userId}`).emit("laterItemStatusUpdated", {
        messageId,
        status,
      });

      callback?.({ success: true });
    })
  );

  // Set reminder
  socket.on(
    "setLaterReminder",
    socketAsync(async ({ messageId, reminderAt }, callback) => {
      if (
        !mongoose.Types.ObjectId.isValid(messageId) ||
        !reminderAt ||
        isNaN(new Date(reminderAt))
      ) {
        throw new AppError("Invalid messageId or reminderAt", 400);
      }

      const updated = await LaterItem.findOneAndUpdate(
        {
          messageId,
          userProfile: socket.userProfileId,
        },
        { $set: { reminderAt: new Date(reminderAt) } },
        { new: true }
      );

      if (!updated) throw new AppError("Later item not found", 404);

      io.to(`user:${socket.userId}`).emit("laterReminderSet", {
        messageId,
        reminderAt,
      });

      callback?.({ success: true });
    })
  );
  // Remove reminder
  // Remove reminder time
  socket.on(
    "removeLaterReminder",
    socketAsync(async ({ messageId }, callback) => {
      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new AppError("Invalid messageId", 400);
      }

      const updated = await LaterItem.findOneAndUpdate(
        {
          messageId,
          userProfile: socket.userProfileId,
        },
        { $set: { reminderAt: null } },
        { new: true }
      );

      if (!updated) throw new AppError("Later item not found", 404);

      io.to(`user:${socket.userId}`).emit("laterReminderRemoved", {
        messageId,
      });

      callback?.({ success: true });
    })
  );

  // Get all saved later items
  socket.on(
    "getLaterItems",
    socketAsync(async ({ status }, callback) => {
      const query = {
        userProfile: socket.userProfileId,
        ...(status && VALID_STATUSES.includes(status) && { status }),
      };

      const items = await LaterItem.find(query)
        .populate({
          path: "messageId",
          populate: {
            path: "attachments createdBy",
            select: "fileName fileUrl fileType userName photo",
          },
        })
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
          messageId: item.messageId?._id,
          message: item.messageId || null,
          status: item.status,
          reminderAt: item.reminderAt,
          reminderStatus,
          reminderDelta,
          savedAt: item.savedAt,
        };
      });

      callback?.({ success: true, items: enhancedItems });
    })
  );
}
