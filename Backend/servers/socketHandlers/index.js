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
