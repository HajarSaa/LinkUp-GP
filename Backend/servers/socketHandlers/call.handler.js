import { userConnections } from "./connection.handler.js";
import Conversation from "../../models/converstion.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";
import { activeCalls } from "../../utils/activeCalls.js";

export default function callHandler(socket, io) {
  const getUserSockets = (userId) => {
    return userConnections.get(userId) || new Set();
  };

  const getOtherUserInfo = async (conversationId) => {
    const conversation = await Conversation.findById(conversationId)
      .populate("memberOneId")
      .populate("memberTwoId");

    if (!conversation) throw new AppError("Conversation not found", 404);

    const callerProfileId = socket.userProfileId.toString();

    if (conversation.memberOneId._id.toString() === callerProfileId) {
      return {
        profileId: conversation.memberTwoId._id.toString(),
        userId: conversation.memberTwoId.user.toString(),
      };
    }

    if (conversation.memberTwoId._id.toString() === callerProfileId) {
      return {
        profileId: conversation.memberOneId._id.toString(),
        userId: conversation.memberOneId.user.toString(),
      };
    }

    throw new AppError("You are not a member of this conversation", 403);
  };

  // Start Call
  socket.on(
    "callUser",
    socketAsync(async ({ conversationId, callType }, callback) => {
      if (!socket.userId || !socket.workspaceId || !socket.userProfileId) {
        throw new AppError("Unauthorized", 401);
      }

      const { userId: targetUserId, profileId: targetProfileId } =
        await getOtherUserInfo(conversationId);

      if (activeCalls.has(targetProfileId)) {
        return callback?.({
          success: false,
          reason: "User is already in a call",
        });
      }

      const targetSockets = getUserSockets(targetUserId);
      if (targetSockets.size === 0) {
        return callback?.({ success: false, reason: "User not connected" });
      }

      targetSockets.forEach((sId) => {
        io.to(sId).emit("callIncoming", {
          from: socket.userId,
          callType: callType || "video",
          conversationId,
        });
      });

      callback?.({ success: true });
    })
  );

  // Call Accepted
  socket.on(
    "callAccepted",
    socketAsync(async ({ conversationId }) => {
      const { userId: targetUserId, profileId: targetProfileId } =
        await getOtherUserInfo(conversationId);

      activeCalls.set(socket.userId, targetProfileId);
      activeCalls.set(targetProfileId, socket.userId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("callAccepted", {
          from: socket.userId,
          conversationId,
        });
      });
    })
  );

  // Call Rejected
  socket.on(
    "callRejected",
    socketAsync(async ({ conversationId }) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("callRejected", {
          from: socket.userId,
          conversationId,
        });
      });
    })
  );

  // User Busy
  socket.on(
    "userBusy",
    socketAsync(async ({ conversationId }) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("userBusy", {
          from: socket.userId,
          conversationId,
        });
      });
    })
  );

  // Send Offer
  socket.on(
    "call:offer",
    socketAsync(async ({ conversationId, offer }, callback) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      if (targetSockets.size === 0) {
        throw new AppError("Target user is not connected", 404);
      }

      targetSockets.forEach((sId) => {
        io.to(sId).emit("call:incoming", {
          from: socket.userId,
          offer,
          conversationId,
        });
      });

      callback?.({ success: true });
    })
  );

  // Send Answer
  socket.on(
    "call:answer",
    socketAsync(async ({ conversationId, answer }) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("call:answered", {
          from: socket.userId,
          answer,
          conversationId,
        });
      });
    })
  );

  // ICE Candidate
  socket.on(
    "call:ice-candidate",
    socketAsync(async ({ conversationId, candidate }) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("call:ice-candidate", {
          from: socket.userId,
          candidate,
          conversationId,
        });
      });
    })
  );

  // End Call
  socket.on(
    "call:end",
    socketAsync(async ({ conversationId }) => {
      const { userId: targetUserId, profileId: targetProfileId } =
        await getOtherUserInfo(conversationId);

      activeCalls.delete(socket.userId);
      activeCalls.delete(targetProfileId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("call:ended", {
          from: socket.userId,
          conversationId,
        });
      });
    })
  );

  // Toggle Mute
  socket.on(
    "toggleMute",
    socketAsync(async ({ conversationId, muted }) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("peerMuteToggled", {
          from: socket.userId,
          muted,
        });
      });
    })
  );

  // Toggle Video
  socket.on(
    "toggleVideo",
    socketAsync(async ({ conversationId, videoEnabled }) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("peerVideoToggled", {
          from: socket.userId,
          videoEnabled,
        });
      });
    })
  );

  // Toggle Screen Share
  socket.on(
    "toggleScreenShare",
    socketAsync(async ({ conversationId, screenSharing }) => {
      const { userId: targetUserId } = await getOtherUserInfo(conversationId);

      const targetSockets = getUserSockets(targetUserId);
      targetSockets.forEach((sId) => {
        io.to(sId).emit("peerScreenShareToggled", {
          from: socket.userId,
          screenSharing,
        });
      });
    })
  );

  // Handle Disconnect
  socket.on("disconnect", () => {
    const userId = socket.userId;
    if (!userId) return;

    const otherUserId = activeCalls.get(userId);
    if (otherUserId) {
      activeCalls.delete(userId);
      activeCalls.delete(otherUserId);

      const otherSockets = getUserSockets(otherUserId);
      otherSockets?.forEach((sId) => {
        io.to(sId).emit("call:ended", {
          from: userId,
          reason: "disconnected",
        });
      });
    }
  });
}
