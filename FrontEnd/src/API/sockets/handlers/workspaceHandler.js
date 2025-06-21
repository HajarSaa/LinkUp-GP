import socket from "../socketService";
import {
  setOnlineUsers,
  clearWorkspace,
  updateWorkspaceName,
  addMemberToWorkspace,
  removeWorkspaceMember,
} from "../../redux_toolkit/api_data/workspaceSlice";

export default function registerWorkspaceHandlers(socket, dispatch) {
  const handlePresenceUpdate = ({ userIds, workspaceId }) => {
    console.log("📶 [presenceUpdate] Online users in", workspaceId, ":", userIds);
    dispatch(setOnlineUsers(userIds));
  };

  const handleMemberJoined = ({ userId, profile, joinedAt }) => {
    console.log(
      `🟢 [workspaceMemberJoined] User '${profile?.name}' (${userId}) joined at ${new Date(joinedAt).toLocaleTimeString()}`
    );
    dispatch(addMemberToWorkspace(profile));
  };

  const handleMemberLeft = ({ userId, profileId, leftAt }) => {
    console.log(
      `🔴 [workspaceMemberLeft] User ${userId} left at ${new Date(leftAt).toLocaleTimeString()}`
    );
    dispatch(removeWorkspaceMember(profileId));

    const currentUserId = socket.userId;
    if (userId === currentUserId) {
      console.warn("🚪 [You Left] Leaving workspace...");
      dispatch(clearWorkspace());
      window.location.href = "/workspaces-landing";
    }
  };

  const handleWorkspaceDeleted = ({ workspaceId, deletedAt }) => {
    console.warn(
      `🗑️ [workspace:deleted] Workspace '${workspaceId}' deleted at ${new Date(deletedAt).toLocaleTimeString()}`
    );
    dispatch(clearWorkspace());
    window.location.href = "/workspaces-landing";
  };

  const handleWorkspaceUpdated = ({ workspaceId, updatedFields, updatedAt }) => {
    console.log(
      `🔧 [workspace:updated] Workspace '${workspaceId}' updated at ${new Date(updatedAt).toLocaleTimeString()}`,
      updatedFields
    );
    if (updatedFields.name) {
      dispatch(updateWorkspaceName(updatedFields.name));
    }
  };

  socket.on("presenceUpdate", handlePresenceUpdate);
  socket.on("workspaceMemberJoined", handleMemberJoined);
  socket.on("workspaceMemberLeft", handleMemberLeft);
  socket.on("workspace:deleted", handleWorkspaceDeleted);
  socket.on("workspace:updated", handleWorkspaceUpdated);

  return () => {
    socket.off("presenceUpdate", handlePresenceUpdate);
    socket.off("workspaceMemberJoined", handleMemberJoined);
    socket.off("workspaceMemberLeft", handleMemberLeft);
    socket.off("workspace:deleted", handleWorkspaceDeleted);
    socket.off("workspace:updated", handleWorkspaceUpdated);
  };
}

export const fetchWorkspaceMembers = (workspaceId, callback) => {
  socket.emit("getWorkspaceMembers", { workspaceId }, callback);
};

export const fetchOnlineUsers = (workspaceId, callback) => {
  socket.emit("getOnlineUsersInWorkspace", { workspaceId }, callback);
};

export const setActiveWorkspace = (workspaceId, callback) => {
  socket.emit("workspace:setActive", workspaceId, callback);
};

export const leaveWorkspace = (workspaceId, callback) => {
  socket.emit("leaveWorkspace", { workspaceId }, callback);
};
