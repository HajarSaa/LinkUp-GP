import { Server } from "socket.io";
import mongoose from "mongoose";
import Message from "./models/message.model.js";
import UserProfile from "./models/userProfile.model.js";
import Conversation from "./models/converstion.model.js";
import Channel from "./models/channel.model.js";
import AppError from "./utils/appError.js";
import { socketAsync } from "./utils/socketAsyncWrapper.js";

//const getRoomName = (id, type) => `${type}:${id}`;

// Improved data structures
const userConnections = new Map();
const userRooms = new Map();
const workspacePresence = new Map(); // Set of userIds in workspace
const userTypingStatus = new Map();
const lastMessageTimestamps = new Map();
const TYPING_INDICATOR_DURATION = 2000; // 2 seconds
const EDIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_MESSAGE_LENGTH = 2000;

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    pingTimeout: 10000,
    pingInterval: 20000,
    cors: {
      origin: process.env.BASE_URL || "http://localhost:5000",
      methods: ["GET", "POST"],
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 120000, // 2 minutes
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

    // Connection metadata
    socket.data = {
      connectedAt: new Date(),
      ipAddress: socket.handshake.address,
      userAgent: socket.handshake.headers["user-agent"],
    };

    // Connection handler (handles both fresh and reconnected connections)
    socket.on(
      "userConnected",
      socketAsync(async (userId, workspaceId, callback) => {
        try {
          // Input validation
          if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(workspaceId)
          ) {
            throw new AppError("Invalid ID format", 400);
          }

          // Initialize connection tracking - THIS IS THE CRITICAL FIX
          if (!userConnections.has(userId)) {
            userConnections.set(userId, new Set());
          }
          if (!workspacePresence.has(workspaceId)) {
            workspacePresence.set(workspaceId, new Set());
          }

          const connectionSet = userConnections.get(userId);
          const presenceSet = workspacePresence.get(workspaceId);

          // Track connection
          connectionSet.add(socket.id); // Now safe to call add()
          presenceSet.add(userId);

          // Rest of your connection logic...
          socket.userId = userId;
          socket.workspaceId = workspaceId;

          // Join rooms
          socket.join([
            `user:${userId}`,
            `workspace:${workspaceId}`,
            `socket:${socket.id}`,
          ]);

          // Only update DB for fresh connections
          let userProfile;
          if (!socket.recovered) {
            await UserProfile.updateMany(
              { user: userId, workspace: workspaceId },
              { $set: { status: "online", lastActive: new Date() } }
            );
            userProfile = await UserProfile.findOne({
              user: userId,
              workspace: workspaceId,
            }).lean();
          } else {
            userProfile = await UserProfile.findOne({
              user: userId,
              workspace: workspaceId,
            }).lean();
          }

          // Broadcast presence
          io.to(`workspace:${workspaceId}`).emit("presenceUpdate", {
            userIds: Array.from(presenceSet),
            workspaceId,
            timestamp: new Date(),
          });

          callback?.({
            success: true,
            profile: userProfile,
            activeConnections: connectionSet.size,
          });
        } catch (error) {
          console.error("Connection error:", {
            userId,
            workspaceId,
            error: error.message,
          });
          throw error; // Let socketAsyncWrapper handle it
        }
      })
    );

    // Disconnection handler
    socket.on(
      "disconnect",
      socketAsync(async (reason) => {
        console.log(`🔌 Disconnected: ${socket.id} (${reason})`);
        const userId = socket.userId;
        const workspaceId = socket.workspaceId;

        if (!userId || !workspaceId) return;

        const userConnSet = userConnections.get(userId);
        const workspaceUserSet = workspacePresence.get(workspaceId);

        if (userConnSet) {
          userConnSet.delete(socket.id);

          if (userConnSet.size === 0) {
            await UserProfile.updateMany(
              { user: userId, workspace: workspaceId },
              {
                $set: {
                  status: "offline",
                  lastSeen: new Date(),
                  connectionStatus: "offline",
                },
              }
            );
            userConnections.delete(userId);
          }
        }

        if (workspaceUserSet) {
          workspaceUserSet.delete(userId);
          if (workspaceUserSet.size === 0) {
            workspacePresence.delete(workspaceId);
          }
        }

        // Only broadcast if the workspace still exists
        if (workspacePresence.has(workspaceId)) {
          io.to(`workspace:${workspaceId}`).emit("onlineUsers", {
            userIds: Array.from(workspacePresence.get(workspaceId)),
            workspaceId,
            timestamp: new Date(),
          });
        }

        console.log(
          `👤 User ${userId} disconnected from workspace ${workspaceId}`,
          `Remaining connections: ${userConnections.get(userId)?.size || 0}`
        );
      })
    );

    // Room management
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

    // Message handling
    socket.on(
      "sendMessage",
      socketAsync(async (data, callback) => {
        // Rate limiting
        const now = Date.now();
        const lastMessageTime = lastMessageTimestamps.get(socket.id) || 0;
        if (now - lastMessageTime < 1000) {
          throw new AppError(
            "Message rate limit exceeded (1 message per second)",
            429
          );
        }
        lastMessageTimestamps.set(socket.id, now);

        const { content, senderId, conversationId, channelId, tempId } = data;

        if (!content?.trim())
          throw new AppError("Message content cannot be empty", 400);
        if (!mongoose.Types.ObjectId.isValid(senderId))
          throw new AppError("Invalid sender ID", 400);
        if (tempId && typeof tempId !== "string")
          throw new AppError("Invalid tempId format", 400);

        let message, room, workspaceId, recipientId;

        if (conversationId) {
          const conversation = await Conversation.findById(conversationId)
            .populate("memberOneId memberTwoId")
            .lean();

          if (!conversation) throw new AppError("Conversation not found", 404);

          workspaceId = conversation.workspaceId;
          recipientId =
            conversation.memberOneId.user.toString() === senderId
              ? conversation.memberTwoId.user.toString()
              : conversation.memberOneId.user.toString();

          const [senderProfile] = await Promise.all([
            UserProfile.findOne({
              user: senderId,
              workspace: workspaceId,
            }).lean(),
          ]);

          if (!senderProfile) throw new AppError("Not in workspace", 403);

          message = await Message.create({
            content,
            createdBy: senderId,
            conversationId,
            readBy: [senderId],
            metadata: { tempId },
          });

          room = `conversation:${conversationId}`;
        } else if (channelId) {
          const channel = await Channel.findById(channelId)
            .select("members workspaceId type")
            .lean();

          if (!channel) throw new AppError("Channel not found", 404);

          workspaceId = channel.workspaceId;
          const senderProfile = await UserProfile.findOne({
            user: senderId,
            workspace: workspaceId,
          }).lean();

          if (!senderProfile) throw new AppError("Not in workspace", 403);

          const isMember = channel.members.some(
            (m) => m.toString() === senderId.toString()
          );
          if (!isMember && channel.type === "private") {
            throw new AppError("Not in private channel", 403);
          }

          message = await Message.create({
            content,
            createdBy: senderId,
            channelId,
            readBy: [senderId],
            metadata: { tempId },
          });

          room = `channel:${channelId}`;
        } else {
          throw new AppError("conversationId or channelId required", 400);
        }

        const messageData = message.toObject();
        if (recipientId) messageData.recipientId = recipientId;

        const useVolatile = room.startsWith("channel:");
        const emitter = useVolatile
          ? socket.to(room).volatile
          : socket.to(room);
        emitter.emit("newMessage", messageData);

        const socketsInRoom = await io.in(room).fetchSockets();
        const deliveredTo = socketsInRoom
          .filter((s) => s.userId !== senderId)
          .map((s) => s.userId);

        if (deliveredTo.length > 0) {
          socket.emit("messageDelivered", {
            messageId: message._id,
            deliveredTo,
            timestamp: new Date(),
          });
        }

        callback?.({
          success: true,
          message: {
            ...messageData,
            delivered: true,
            workspaceId,
          },
        });
      })
    );
    // read receipts
    socket.on(
      "markAsRead",
      socketAsync(async ({ messageIds, userId }, callback) => {
        const messageIdArray = Array.isArray(messageIds)
          ? messageIds
          : [messageIds];
        if (messageIdArray.some((id) => !mongoose.Types.ObjectId.isValid(id))) {
          throw new AppError("Invalid message ID(s)", 400);
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new AppError("Invalid user ID", 400);
        }

        // update messages in bulk --> better performance
        const { modifiedCount } = await Message.updateMany(
          { _id: { $in: messageIdArray } },
          { $addToSet: { readBy: userId } }
        );

        if (modifiedCount === 0) {
          throw new AppError("No messages were marked as read", 404);
        }
        const updatedMessages = await Message.find({
          _id: { $in: messageIdArray },
        }).lean();

        const broadcastPromises = updatedMessages.map(async (message) => {
          const room = message.channelId
            ? `channel:${message.channelId}`
            : `conversation:${message.conversationId}`;

          // Get user details for readBy users
          const readByUsers = await UserProfile.find({
            user: { $in: message.readBy },
            workspace: message.channelId
              ? (
                  await Channel.findById(message.channelId)
                    .select("workspaceId")
                    .lean()
                ).workspaceId
              : (
                  await Conversation.findById(message.conversationId)
                    .select("workspaceId")
                    .lean()
                ).workspaceId,
          }).lean();

          io.to(room).emit("messageRead", {
            messageId: message._id,
            readBy: readByUsers.map((user) => ({
              userId: user.user._id,
              timestamp: new Date(),
            })),
          });
        });

        await Promise.all(broadcastPromises);

        callback?.({ success: true, modifiedCount });
      })
    );

    // Typing indicators
    socket.on(
      "typing",
      socketAsync(async ({ userId, room, typingStatus }, callback) => {
        if (!userId || !room) {
          throw new AppError("userId and room required", 400);
        }
        if (!socket.rooms.has(room)) {
          throw new AppError("Not in room", 403);
        }

        const userRoomKey = `${userId}-${room}`;
        const now = Date.now();

        if (typingStatus) {
          // Clear existing timeout if any
          const existing = userTypingStatus.get(userRoomKey);
          if (existing) clearTimeout(existing.timeout);

          // Set new typing state
          userTypingStatus.set(userRoomKey, {
            lastActive: now,
            timeout: setTimeout(() => {
              socket.to(room).emit("typing", {
                userId,
                typingStatus: false,
                timestamp: Date.now(),
              });
              userTypingStatus.delete(userRoomKey);
            }, 2000),
          });

          // Throttle emits
          if (
            !existing ||
            now - existing.lastActive >= TYPING_INDICATOR_DURATION
          ) {
            socket.to(room).emit("typing", {
              userId,
              typingStatus: true,
              timestamp: now,
            });
            lastTypingEvent = now;
          }
        } else {
          // User stopped typing - clear state
          const state = userTypingStatus.get(userRoomKey);
          if (state) {
            clearTimeout(state.timeout);
            userTypingStatus.delete(userRoomKey);
          }
          socket.to(room).emit("typing", {
            userId,
            typingStatus: false,
            timestamp: now,
          });
        }

        callback?.({ success: true });
      })
    );

    // Message deletion
    socket.on(
      "deleteMessage",
      socketAsync(async (messageId, callback) => {
        const message = await Message.findById(messageId);
        if (!message) throw new AppError("Message not found", 404);

        const isAuthor = message.createdBy.toString() === socket.userId;
        if (!isAuthor) throw new AppError("Not authorized", 403);

        await Message.deleteOne({ _id: messageId });
        const room = message.channelId
          ? `channel:${message.channelId}`
          : `conversation:${message.conversationId}`;

        io.to(room).emit("messageDeleted", messageId);

        callback?.({ success: true });
      })
    );

    // Message edit
    socket.on(
      "editMessage",
      socketAsync(async ({ messageId, newContent }, callback) => {
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
          throw new AppError("Invalid message ID format", 400);
        }

        if (typeof newContent !== "string" || !newContent.trim()) {
          throw new AppError("Message content cannot be empty", 400);
        }

        if (newContent.length > MAX_MESSAGE_LENGTH) {
          throw new AppError(
            `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters`,
            400
          );
        }

        const editWindowCutoff = new Date(Date.now() - EDIT_WINDOW_MS);

        const message = await Message.findOneAndUpdate(
          {
            _id: messageId,
            createdBy: socket.userId,
            createdAt: { $gte: editWindowCutoff },
            edited: { $ne: true },
          },
          {
            $set: {
              content: newContent,
              edited: true,
              editedAt: new Date(),
            },
          },
          {
            new: true,
            runValidators: true,
          }
        ).lean();

        if (!message) {
          throw new AppError(
            `Message not editable (must be edited within ${
              EDIT_WINDOW_MS / 60000
            } minutes of sending)`,
            400
          );
        }

        const room = message.channelId
          ? `channel:${message.channelId}`
          : `conversation:${message.conversationId}`;

        io.to(room).emit("messageEdited", {
          messageId: message._id,
          newContent: message.content,
          edited: true,
          editedAt: message.editedAt,
          updatedAt: message.updatedAt,
        });

        callback?.({
          success: true,
          message: {
            ...message,
            workspaceId: message.channelId
              ? (await Channel.findById(message.channelId)).workspaceId
              : (await Conversation.findById(message.conversationId))
                  .workspaceId,
          },
        });
      })
    );

    // Message history
    socket.on(
      "getMessageHistory",
      socketAsync(async ({ roomId, type, before, limit = 50 }, callback) => {
        const query = {
          [type === "channel" ? "channelId" : "conversationId"]: roomId,
          ...(before && { createdAt: { $lt: new Date(before) } }),
        };

        const messages = await Message.find(query)
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean();

        callback({ success: true, messages });
      })
    );
  });

  return io;
};

export default socketServer;
