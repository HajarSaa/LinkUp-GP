import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

const TYPING_INDICATOR_DURATION = 2000;
const userTypingStatus = new Map();

export default function typingHandler(socket) {
  socket.on(
    "typing",
    socketAsync(async ({ userId, room, typingStatus }, callback) => {
      if (!userId || !room) throw new AppError("userId and room required", 400);
      if (!socket.rooms.has(room)) throw new AppError("Not in room", 403);

      const userRoomKey = `${userId}-${room}`;
      const now = Date.now();

      if (typingStatus) {
        const existing = userTypingStatus.get(userRoomKey);
        if (existing) clearTimeout(existing.timeout);

        userTypingStatus.set(userRoomKey, {
          lastActive: now,
          timeout: setTimeout(() => {
            socket.to(room).emit("typing", {
              userId,
              typingStatus: false,
              timestamp: Date.now(),
            });
            userTypingStatus.delete(userRoomKey);
          }, TYPING_INDICATOR_DURATION),
        });

        if (
          !existing ||
          now - existing.lastActive >= TYPING_INDICATOR_DURATION
        ) {
          socket.to(room).emit("typing", {
            userId,
            typingStatus: true,
            timestamp: now,
          });
        }
      } else {
        const state = userTypingStatus.get(userRoomKey);
        if (state) clearTimeout(state.timeout);
        userTypingStatus.delete(userRoomKey);
        socket.to(room).emit("typing", {
          userId,
          typingStatus: false,
          timestamp: now,
        });
      }

      callback?.({ success: true });
    })
  );
}
