import socket from "../socketService";

export default function registerRoomHandler() {
  const joinRoom = (roomId) => {
    if (!roomId) return;
    socket.emit("joinRoom", roomId, (res) => {
      if (res?.success) {
        console.log(`✅ Joined room: ${roomId}`);
      } else {
        console.warn(`❌ Failed to join room: ${roomId}`, res);
      }
    });
  };

  const leaveRoom = (roomId) => {
    if (!roomId) return;
    socket.emit("leaveRoom", roomId, (res) => {
      if (res?.success) {
        console.log(`🚪 Left room: ${roomId}`);
      } else {
        console.warn(`❌ Failed to leave room: ${roomId}`, res);
      }
    });
  };

  return { joinRoom, leaveRoom };
}
