import connectionHandler from "./connection.handler.js";
import presenceHandler from "./presence.handler.js";
import roomHandler from "./room.handler.js";
import messageHandler from "./message.handler.js";
import typingHandler from "./typing.handler.js";
import readReceiptHandler from "./readReceipt.handler.js";
import pinningHandler from "./pinning.handler.js";
import laterItemHandler from "./later.handler.js";
import workspaceHandler from "./workspace.handler.js";
import historyHandler from "./history.handler.js";

export const initializeSocketHandlers = (socket, io) => {
  // socket.on("userConnected", async (userId, workspaceId, callback) => {
  //   try {
  //     socket.userId = userId;
  //     socket.workspaceId = workspaceId;

  //     const profile = await UserProfile.findOne({
  //       user: userId,
  //       workspace: workspaceId,
  //     });

  //     if (!profile) {
  //       return callback({ success: false, message: "User profile not found" });
  //     }

  //     callback({
  //       success: true,
  //       profile,
  //       status: profile.status,
  //       customStatus: profile.customStatus,
  //     });

  //     // لو عايز تبعت حالته لباقي الناس في نفس workspace
  //     io.to(`workspace:${workspaceId}`).emit("userStatusChanged", {
  //       userId,
  //       status: profile.status,
  //       customStatus: profile.customStatus,
  //       timestamp: new Date(),
  //     });
  //   } catch (error) {
  //     console.error("Error in userConnected:", error);
  //     callback({ success: false, message: "Internal server error" });
  //   }
  // });
  connectionHandler(socket, io);
  presenceHandler(socket, io);
  roomHandler(socket, io);
  messageHandler(socket, io);
  typingHandler(socket, io);
  readReceiptHandler(socket, io);
  pinningHandler(socket, io);
  laterItemHandler(socket, io);
  workspaceHandler(socket, io);
  historyHandler(socket, io);
};
