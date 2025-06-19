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
        profileId: socket.userProfileId,
        leftAt: new Date(),
      });

      callback?.({ success: true });
    })
  );
  socket.on(
    "getWorkspaceMembers",
    socketAsync(async ({ workspaceId }, callback) => {
      if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
        throw new AppError("Invalid workspace ID", 400);
      }

      const members = await UserProfile.find({ workspace: workspaceId })
        .select("userName photo status role user")
        .lean();

      const onlineUserIds = workspacePresence.has(workspaceId)
        ? Array.from(workspacePresence.get(workspaceId))
        : [];

      const fullMembers = members.map((member) => ({
        _id: member._id,
        name: member.userName,
        avatar: member.photo || null,
        role: member.role,
        status: onlineUserIds.includes(member.user.toString())
          ? "online"
          : member.status || "offline",
      }));

      callback?.({ success: true, members: fullMembers });
    })
  );
  socket.on(
    "workspace:setActive",
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

      // Store it on the socket instance(to use later for filtering invitations and notifications)
      socket.activeWorkspaceId = workspaceId;

      console.log(
        `Active workspace set: ${workspaceId} for user ${socket.userId}`
      );

      callback?.({
        success: true,
        message: "Active workspace set successfully",
        workspaceId,
      });
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

4- getWorkspaceMembers testing.
socket.emit("getWorkspaceMembers", { workspaceId: "68091d28c422c24ab4fd6528" }, (res) => {
  if (res.success) {
    console.log("👥 Members:", res.members);
  } else {
    console.error("❌ Failed to fetch members:", res);
  }
});
5- workspace:setActive testing.
socket.emit("workspace:setActive", "68091d28c422c24ab4fd6528", (res) => {
  console.log("📌 setActive response:", res);
});


*/
