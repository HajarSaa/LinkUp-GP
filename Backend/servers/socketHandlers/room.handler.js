import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";
import { userRooms } from "./connection.handler.js";

export default function roomHandler(socket) {
  socket.on(
    "joinRoom",
    socketAsync(async (roomId, callback) => {
      if (!roomId || typeof roomId !== "string") {
        throw new AppError("Valid room ID required", 400);
      }

      if (!socket.rooms.has(roomId)) {
        socket.join(roomId);

        if (!userRooms.has(socket.userId)) {
          userRooms.set(socket.userId, new Set());
        }
        userRooms.get(socket.userId).add(roomId);

        console.log(`🚪 ${socket.id} joined room ${roomId}`);
      }

      callback?.({ success: true });
    })
  );

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);

    if (userRooms.has(socket.userId)) {
      userRooms.get(socket.userId).delete(roomId);
    }

    console.log(`🚪 ${socket.id} left room ${roomId}`);
  });
}
