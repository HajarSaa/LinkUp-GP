import mongoose from "mongoose";
import UserProfile from "../../models/userProfile.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";
import { setUserStatus } from "../../utils/presenceUtils.js";

export const userConnections = new Map();
export const workspacePresence = new Map();
export const userRooms = new Map();

export default function connectionHandler(socket, io) {
  socket.on(
    "userConnected",
    socketAsync(async (userId, workspaceId, callback) => {
      if (
        !mongoose.Types.ObjectId.isValid(userId) ||
        !mongoose.Types.ObjectId.isValid(workspaceId)
      )
        throw new AppError("Invalid ID format", 400);

      if (!userConnections.has(userId)) {
        userConnections.set(userId, new Set());
      }
      if (!workspacePresence.has(workspaceId)) {
        workspacePresence.set(workspaceId, new Set());
      }

      const connectionSet = userConnections.get(userId);
      const presenceSet = workspacePresence.get(workspaceId);

      connectionSet.add(socket.id);
      presenceSet.add(userId);

      socket.userId = userId;
      socket.workspaceId = workspaceId;

      socket.join([
        `user:${userId}`,
        `workspace:${workspaceId}`,
        `socket:${socket.id}`,
      ]);

      const userProfile = await UserProfile.findOne({
        user: userId,
        workspace: workspaceId,
      }).lean();

      if (!userProfile) {
        throw new AppError("UserProfile not found", 404);
      }

      socket.userProfileId = userProfile._id;

      if (!socket.recovered && connectionSet.size === 1) {
        await setUserStatus(userId, workspaceId, "online");
      }

      io.to(`workspace:${workspaceId}`).emit("presenceUpdate", {
        userIds: Array.from(presenceSet),
        workspaceId,
        timestamp: new Date(),
      });

      callback?.({
        success: true,
        profile: userProfile,
        activeConnections: connectionSet.size,
      });
    })
  );

  socket.on(
    "disconnect",
    socketAsync(async (reason) => {
      console.log(`🔌 Disconnected: ${socket.id} (${reason})`);
      const { userId, workspaceId } = socket;
      if (!userId || !workspaceId) return;

      const userConnSet = userConnections.get(userId);
      const workspaceUserSet = workspacePresence.get(workspaceId);

      if (userConnSet) {
        userConnSet.delete(socket.id);
        if (userConnSet.size === 0) {
          await setUserStatus(userId, workspaceId, "offline");
          userConnections.delete(userId);
        }
      }

      if (workspaceUserSet) {
        workspaceUserSet.delete(userId);
        if (workspaceUserSet.size === 0) {
          workspacePresence.delete(workspaceId);
        }
      }

      // if (workspacePresence.has(workspaceId)) {
      //   io.to(`workspace:${workspaceId}`).emit("onlineUsers", {
      //     userIds: Array.from(workspacePresence.get(workspaceId)),
      //     workspaceId,
      //     timestamp: new Date(),
      //   });
      // }

      // Reload problem solution: make user emit on presenceUpdate rather than onlineUsers to get the correct use connection without reload page :)
      if (workspacePresence.has(workspaceId)) {
        io.to(`workspace:${workspaceId}`).emit("presenceUpdate", {
          userIds: Array.from(workspacePresence.get(workspaceId)),
          workspaceId,
          timestamp: new Date(),
        });
      }
    })
  );
}
