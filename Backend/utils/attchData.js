import UserProfile from "../models/userProfile.model.js";
import AppError from "./appError.js";

// Attach user data to request body
export const attachUserData = (fieldMappings) => {
  return (req, res, next) => {
    // Attach data to req.body based on field mappings
    Object.entries(fieldMappings).forEach(([attribute, value]) => {
      req.body[attribute] = req.user[value];
    });
    next();
  };
};

// Attach user profile data to request body
export const attachUserProfileData = (field) => {
  return async (req, res, next) => {
    // Find user profile based on workspace
    const userProfile = await UserProfile.findOne({
      workspace: req.body.workspaceId || req.params.workspaceId,
      user: req.user.id,
    });

    if (!userProfile) {
      return next(new AppError("User profile not found", 404));
    }

    req.body[field] = userProfile.id;
    next();
  };
};
