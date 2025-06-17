import mongoose from "mongoose";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";
import Workspace from "../../models/workspace.model.js";
import UserProfile from "../../models/userProfile.model.js";
import { workspacePresence } from "./connection.handler.js";

export default function workspaceHandler(socket, io) {
  socket.on(
    "joinWorkspaceRoom",
    socketAsync(async (workspaceId, callback) => {
      if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
        throw new AppError("Invalid workspace ID", 400);
      }
      const userProfile = await UserProfile.findOne({
        user: socket.userId,
        workspace: workspaceId,
      });

      if (!userProfile) {
        throw new AppError("You are not a member of this workspace", 403);
      }

      socket.join(`workspace:${workspaceId}`);

      console.log(`✅ ${socket.userId} joined workspace:${workspaceId}`);

      callback?.({ success: true });
    })
  );
  socket.on(
    "getOnlineUsersInWorkspace",
    socketAsync(async ({ workspaceId }, callback) => {
      if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
        throw new AppError("Invalid workspace ID", 400);
      }

      const onlineUserIds = workspacePresence.has(workspaceId)
        ? Array.from(workspacePresence.get(workspaceId))
        : [];

      callback?.({
        success: true,
        workspaceId,
        onlineUsers: onlineUserIds,
        count: onlineUserIds.length,
      });
    })
  );
  socket.on(
    "leaveWorkspace",
    socketAsync(async ({ workspaceId }, callback) => {
      if (!workspaceId || !socket.userId) {
        throw new Error("Missing workspaceId or user not connected");
      }

      if (workspacePresence.has(workspaceId)) {
        const set = workspacePresence.get(workspaceId);
        set.delete(socket.userId);
        if (set.size === 0) {
          workspacePresence.delete(workspaceId);
        }
      }

      await socket.leave(`workspace:${workspaceId}`);

      io.to(`workspace:${workspaceId}`).emit("workspaceMemberLeft", {
        userId: socket.userId,
        leftAt: new Date(),
      });

      callback?.({ success: true });
    })
  );
}

/*
1- joinWorkspace testing.
const workspaceId = "64abc123..."; 
socket.emit("joinWorkspaceRoom", workspaceId, (res) => {
  console.log("🎯 join workspace response:", res);
});

2- getOnlineUsersInWorkspace testing.
socket.emit("getOnlineUsersInWorkspace", {
  workspaceId: "68091d28c422c24ab4fd6528"
}, (res) => {
  if (res.success) {
    console.log("👥 Online users:", res.onlineUsers);
  }
});

3- leaveWorkspace testing.
socket.emit("leaveWorkspace", { workspaceId: "68091d28c422c24ab4fd6528" }, (res) => {
  console.log("👋 Left workspace response:", res);
});
*/
