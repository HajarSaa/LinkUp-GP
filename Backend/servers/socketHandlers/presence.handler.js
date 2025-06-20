import mongoose from "mongoose";
import UserProfile from "../../models/userProfile.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";
import { setUserStatus } from "../../utils/presenceUtils.js";
import { getStatusPayloadById } from "../../utils/StatusPresets.js";

export default function presenceHandler(socket, io) {
  // Set or update user status (supports custom or presetId)
  socket.on(
    "updateStatus",
    socketAsync(async ({ status, customStatus, presetId }, callback) => {
      if (!socket.userId || !socket.workspaceId) {
        throw new AppError("User is not connected", 401);
      }

      if (!["online", "away", "busy", "offline"].includes(status)) {
        throw new AppError("Invalid status value", 400);
      }

      let finalCustomStatus = customStatus;

      // Support preset selection
      if (!finalCustomStatus && presetId) {
        finalCustomStatus = getStatusPayloadById(presetId);
        if (!finalCustomStatus) {
          throw new AppError("Invalid preset ID", 400);
        }
      }

      if (status === "offline") {
        await UserProfile.updateOne(
          { _id: socket.userProfileId },
          {
            $set: {
              status: "offline",
              lastActive: new Date(),
              customStatus: null,
            },
          }
        );
      } else {
        await setUserStatus(
          socket.userId,
          socket.workspaceId,
          status,
          finalCustomStatus || null
        );
      }

      io.to(`workspace:${socket.workspaceId}`).emit("userStatusChanged", {
        userId: socket.userId,
        status,
        customStatus: finalCustomStatus,
        timestamp: new Date(),
      });

      callback?.({ success: true });
    })
  );

  // Clear custom status manually
  socket.on(
    "clearCustomStatus",
    socketAsync(async (callback) => {
      await UserProfile.updateOne(
        { _id: socket.userProfileId },
        { $set: { customStatus: null } }
      );

      io.to(`workspace:${socket.workspaceId}`).emit("userStatusChanged", {
        userId: socket.userId,
        customStatus: null,
        timestamp: new Date(),
      });

      callback?.({ success: true });
    })
  );

  // Get active users in workspace
  socket.on(
    "getActiveUsers",
    socketAsync(async (workspaceId, callback) => {
      if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
        throw new AppError("Invalid workspace ID", 400);
      }

      const activeUsers = await UserProfile.find({
        workspace: workspaceId,
        status: { $ne: "offline" },
        lastActive: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
      }).lean();

      callback({
        success: true,
        users: activeUsers.map((user) => ({
          userId: user.user,
          status: user.status,
          customStatus: user.customStatus,
          lastActive: user.lastActive,
          connectionQuality: user.connectionQuality,
        })),
      });
    })
  );

  // Auto clear expired customStatus every minute
  setInterval(async () => {
    await UserProfile.updateMany(
      {
        "customStatus.expiresAt": { $lte: new Date() },
        "customStatus.dontClear": { $ne: true },
      },
      { $set: { customStatus: null } }
    );
  }, 60000);

  // Batch update lastActive using presenceHeartbeat
  let heartbeatQueue = new Set();

  socket.on("presenceHeartbeat", () => {
    if (socket.userId && socket.workspaceId) {
      heartbeatQueue.add(`${socket.userId}-${socket.workspaceId}`);
    }
  });

  const processHeartbeats = () => {
    const updates = Array.from(heartbeatQueue).map((key) => {
      const [userId, workspaceId] = key.split("-");
      return UserProfile.updateOne(
        { user: userId, workspace: workspaceId },
        { $set: { lastActive: new Date() } }
      );
    });

    Promise.all(updates).catch(console.error);
    heartbeatQueue.clear();
  };
  setInterval(processHeartbeats, 10000);
}
