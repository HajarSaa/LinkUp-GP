import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../utils/handlerFactory.js";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const createUser = createOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);

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

  // Extract all workspaces from the user
  const workspaces = user.workspaceProfiles.map((el) =>
    el.workspace ? el.workspace : el
  );

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
