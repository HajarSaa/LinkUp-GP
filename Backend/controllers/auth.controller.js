import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createSendTokenCookie } from "../utils/jwt.js";

export const signup = catchAsync(async (req, res, next) => {
  // Check if the email already exists
  const existingUser = await User.find({ email: req.body.email });

  // If user exists, return an error
  if (existingUser.length > 0) {
    return next(new AppError("Email already exists", 400));
  }

  // Create a new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Send token to client
  createSendTokenCookie(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // If everything is ok, send token to client
  createSendTokenCookie(user, 200, res);
});

export const logout = catchAsync(async (req, res, next) => {
  // Clear the JWT cookie by setting it to an empty value and expiring it immediately
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1), // expires almost immediately
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  // Send a response to the client
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
