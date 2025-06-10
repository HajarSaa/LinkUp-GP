import { Server } from "socket.io";
import mongoose from "mongoose";
import UserProfile from "../models/userProfile.model.js";
import { initializeSocketHandlers } from "./socketHandlers/index.js";

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    pingTimeout: 10000,
    pingInterval: 20000,
    cors: {
      origin: function (origin, callback) {
        const allowedOrigins = [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://127.0.0.1:5173",
          // the frontend URL for production(if any)
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, origin);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 120000,
      skipMiddlewares: true,
    },
  });

  process.on("SIGINT", async () => {
    console.log("Server shutting down... marking all users offline");
    try {
      await UserProfile.updateMany(
        { status: "online" },
        { $set: { status: "offline" } }
      );
      console.log("All users marked offline");
    } catch (err) {
      console.error("Failed to update statuses:", err);
    }
    setTimeout(() => process.exit(0), 1000);
  });

  io.on("connection", (socket) => {
    console.log(`🔌 New connection: ${socket.id}`);
    let connectionStartTime = Date.now();
    let lastTypingEvent = 0;

    socket.data = {
      connectedAt: new Date(),
      ipAddress: socket.handshake.address,
      userAgent: socket.handshake.headers["user-agent"],
    };

    initializeSocketHandlers(socket, io);
  });

  return io;
};

export default socketServer;
