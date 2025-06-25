import UserProfile from "../../models/userProfile.model.js";
import AppError from "../../utils/appError.js";
import { socketAsync } from "../../utils/socketAsyncWrapper.js";

const ALLOWED_PROFILE_FIELDS = ["userName", "email", "about"];

export default function userProfileHandler(socket, io) {
  // update basic profile info
  socket.on(
    "userProfile:updateInfo",
    socketAsync(async ({ updates }, callback) => {
      if (!socket.userId || !socket.workspaceId || !socket.userProfileId) {
        throw new AppError("Unauthorized", 401);
      }

      const filteredUpdates = Object.keys(updates || {}).reduce((acc, key) => {
        if (ALLOWED_PROFILE_FIELDS.includes(key)) {
          acc[key] = updates[key];
        }
        return acc;
      }, {});

      if (Object.keys(filteredUpdates).length === 0) {
        throw new AppError("No valid fields provided", 400);
      }

      const updatedProfile = await UserProfile.findByIdAndUpdate(
        socket.userProfileId,
        { $set: filteredUpdates },
        { new: true, runValidators: true }
      ).lean();

      if (!updatedProfile) {
        throw new AppError("User profile not found", 404);
      }

      const { _id, userName, email, about, status, photo } = updatedProfile;

      io.to(`workspace:${socket.workspaceId}`).emit("userProfile:updated", {
        userId: socket.userId,
        profile: {
          _id,
          userName,
          email,
          about,
          status,
          photo,
        },
      });

      return callback?.({ success: true });
    })
  );

  // update profile photo
  socket.on(
    "userProfile:updatePhoto",
    socketAsync(async ({ photoUrl }, callback) => {
      if (!socket.userId || !socket.workspaceId || !socket.userProfileId) {
        throw new AppError("Unauthorized", 401);
      }

      if (!photoUrl) {
        throw new AppError("photoUrl is required", 400);
      }

      const updated = await UserProfile.findByIdAndUpdate(
        socket.userProfileId,
        { $set: { photo: photoUrl } },
        { new: true }
      );

      if (!updated) {
        throw new AppError("User profile not found", 404);
      }

      io.to(`workspace:${socket.workspaceId}`).emit(
        "userProfile:photoUpdated",
        {
          userId: socket.userId,
          profileId: updated._id,
          photo: updated.photo,
        }
      );

      return callback?.({ success: true });
    })
  );
}
