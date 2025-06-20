import socket from "../socketService";
import {
  setOnlineUsers,
  clearWorkspace,
  updateWorkspaceName,
  removeWorkspaceMember,
} from "../../redux_toolkit/api_data/workspaceSlice";

export default function registerWorkspaceHandlers(socket, dispatch) {
  const handlePresenceUpdate = ({ userIds }) => {
    dispatch(setOnlineUsers(userIds));
  };

  const handleMemberJoined = ({ userId, profile }) => {
    console.log("👥 New member joined:", profile?.name, "ID:", userId);
    // toast.info(`${profile?.name} has joined the workspace.`);
  };

  const handleMemberLeft = ({ userId, profileId, leftAt }) => {
    console.log("👋 Member left:", userId, "at", leftAt);
    dispatch(removeWorkspaceMember(profileId));

    const currentUserId = socket.userId;
    if (userId === currentUserId) {
      dispatch(clearWorkspace());
      // toast.error("You have been removed from the workspace.");
      // window.location.href = "/workspaces-landing";
    }
  };

  const handleWorkspaceDeleted = ({ workspaceId, deletedAt }) => {
    console.warn(`🚨 Workspace ${workspaceId} deleted at ${deletedAt}`);
    dispatch(clearWorkspace());
    // toast.error("Workspace has been deleted.");
    // window.location.href = "/workspaces-landing";
  };

  const handleWorkspaceUpdated = ({ workspaceId, updatedFields, updatedAt }) => {
    console.log(`🔄 Workspace with ID: ${workspaceId} updated at: ${updatedAt}`, updatedFields);
    if (updatedFields.name) {
      dispatch(updateWorkspaceName(updatedFields.name));
      // toast.success("Workspace name updated.");
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
