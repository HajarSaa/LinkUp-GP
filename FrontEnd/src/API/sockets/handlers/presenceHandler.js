// sockets/handlers/presenceHandler.js

import socket from "../socketService";
import { updateUserStatus } from "../../redux_toolkit/api_data/userProfileSlice";

export default function registerPresenceHandlers(socket, dispatch) {
  const handleUserStatusChanged = ({ userId, status, customStatus, timestamp }) => {
    console.log("🔁 userStatusChanged:", { userId, status, customStatus });

    dispatch(updateUserStatus({
      userId,
      status,
      customStatus,
      lastActive: timestamp,
    }));
  };

  socket.on("userStatusChanged", handleUserStatusChanged);

  return () => {
    socket.off("userStatusChanged", handleUserStatusChanged);
  };
}

// helpers
export const updateStatus = (statusPayload, callback) => {
  socket.emit("updateStatus", statusPayload, callback);
};

export const clearCustomStatus = (callback) => {
  socket.emit("clearCustomStatus", callback);
};

export const getActiveUsers = (workspaceId, callback) => {
  socket.emit("getActiveUsers", workspaceId, callback);
};

export const sendHeartbeat = () => {
  socket.emit("presenceHeartbeat");
};
