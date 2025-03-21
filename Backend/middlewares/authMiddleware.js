import User from "../models/user.model.js";
import UserProfile from "../models/userProfile.model.js";
import Workspace from "../models/workspace.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyToken } from "../utils/jwt.js";

// Protect using jwt stored in the header
// export const protect = catchAsync(async (req, res, next) => {
//   let token;

//   // Get the token from the request header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   // Check if the token exists
//   if (!token) {
//     return next(
//       new AppError("You are not logged in! Please log in to get access", 401)
//     );
//   }

//   // Verify the token
//   const decoded = verifyToken(token);

//   // Check if the user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError(
//         "The user belonging to this token does no longer exist.",
//         401
//       )
//     );
//   }

//   // Check if the user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please log in again.", 401)
//     );
//   }

//   // Grant access to the protected route
//   req.user = currentUser;
//   next();
// });

// Protect using jwt stored in cookie
export const protect = catchAsync(async (req, res, next) => {
  // Get token from headers
  const token = req.cookies.jwt;

  // Check if the token exists
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // Verify the token
  const decoded = verifyToken(token);

  // Check if the user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // Check if the user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // Grant access to the protected route
  req.user = currentUser;
  next();
});

// Protect the route for only members of the workspace
// Attches the workspace to the request
export const protectAttchWorkspace = catchAsync(async (req, res, next) => {
  const workspaceId = req.cookies.workspace;

  if (!workspaceId) {
    return next(new AppError("Workspace id not found", 404));
  }

  // Find the workspace
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    return next(new AppError("Workspace not found", 404));
  }

  // Find the user's profile in this workspace
  const userProfile = await UserProfile.findOne({
    user: req.user.id,
    workspace: workspaceId,
  });

  if (!userProfile) {
    return next(new AppError("User profile not found in this workspace", 404));
  }

  // Ensure that the user is a member of the workspace
  if (!workspace.members.includes(userProfile.id)) {
    return next(new AppError("You are not a member of this workspace", 403));
  }

  // Attach workspace to request
  req.workspace = workspace;
  // Attach userProfile to request
  req.userProfile = userProfile;
  next();
});
