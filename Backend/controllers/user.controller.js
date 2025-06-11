import { getAll } from "../utils/handlerFactory.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllUsers = getAll(User);

export const getMe = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Get user and populate workspaceProfiles
  const user = await User.findById(userId).populate({
    path: "workspaceProfiles",
    populate: {
      path: "workspace",
      select: "name members",
      populate: {
        path: "members",
        select: "photo",
      },
    },
  });

  // Check if user exisits
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Extract all workspaces from the user and attach userProfileId
  const workspaces = user.workspaceProfiles.map((el) => {
    const workspace = el.workspace ? el.workspace.toObject() : el.toObject();
    workspace.userProfileId = el._id; // Attach only the id
    return workspace;
  });

  // Send the response
  res.status(200).json({
    status: "success",
    data: {
      user: {
        _id: user.id,
        email: user.email,
      },
      workspaces,
    },
  });
});
