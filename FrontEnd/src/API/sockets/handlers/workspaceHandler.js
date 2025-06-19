import socket from "../socketService";
import {
  setOnlineUsers,
  clearWorkspace,
} from "../../redux_toolkit/api_data/workspaceSlice";

export default function registerWorkspaceHandlers(socket, dispatch) {
  const handlePresenceUpdate = ({ userIds }) => {
    dispatch(setOnlineUsers(userIds));
  };

  const handleMemberJoined = ({ userId, profile }) => {
    console.log("👥 New member joined:", profile?.name, "ID:", userId);
  };

  const handleMemberLeft = ({ userId, leftAt }) => {
    console.log("👋 Member left:", userId, "at", leftAt);
  };

  const handleWorkspaceDeleted = ({ workspaceId, deletedAt }) => {
    console.warn(`🚨 Workspace ${workspaceId} deleted at ${deletedAt}`);
    dispatch(clearWorkspace());
  };

  socket.on("presenceUpdate", handlePresenceUpdate);
  socket.on("workspaceMemberJoined", handleMemberJoined);
  socket.on("workspaceMemberLeft", handleMemberLeft);
  socket.on("workspace:deleted", handleWorkspaceDeleted);

  return () => {
    socket.off("presenceUpdate", handlePresenceUpdate);
    socket.off("workspaceMemberJoined", handleMemberJoined);
    socket.off("workspaceMemberLeft", handleMemberLeft);
    socket.off("workspace:deleted", handleWorkspaceDeleted);
  };
}

// Emit helpers
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
