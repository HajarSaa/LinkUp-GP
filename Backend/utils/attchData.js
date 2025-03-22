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
