import UserProfile from "../models/userProfile.model.js";

export const attachUserData = (fieldMappings) => {
  return (req, res, next) => {
    // Attach data to req.body based on field mappings
    Object.entries(fieldMappings).forEach(([attribute, value]) => {
      req.body[attribute] = req.user[value];
    });
    next();
  };
};

export const attachUserProfileData = () => {
  return async (req, res, next) => {
    const userProfile = await UserProfile.findOne({
      workspace: req.body.workspaceId,
    });

    req.body.createdBy = userProfile.id;
    next();
  };
};
