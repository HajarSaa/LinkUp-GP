import socket from './socketService'

export function connectToSocket(userId, workspaceId) {
  socket.connect();
  socket.emit("userConnected", userId, workspaceId, (response) => {
  if (response?.success) {
  console.log("📡 Connected to socket successfully", response);
  }
  });
  socket.on("presenceUpdate", (data) => {
  console.log("👥 Presence Updated:", data.userIds);

  });
  socket.on("onlineUsers", (data) => {
  console.log("📶 Current Online Users:", data.userIds);

  });
}