import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyToken } from "../utils/jwt.js";

// protect using jwt stored in the header
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

// protect using jwt stored in cookie
export const protect = catchAsync(async (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization;

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

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ["admin", "user"]. role="user"
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
