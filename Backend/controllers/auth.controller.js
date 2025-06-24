import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createSendTokenCookie } from "../utils/jwt.js";
import sendEmail from "../utils/email.js";

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

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Check if email exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("No user with that email", 404));
  }

  // Generate a passwword reset code
  const passwordResetCode = user.createPaswordResetToken();
  await user.save({ validateBeforeSave: false });

  console.log(passwordResetCode);
  // Send the password reset code to the user's email
  await sendEmail({
    email: user.email,
    subject: "Your password reset code",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333">
        <div style="background:#8E7C5F;padding:30px;text-align:center;color:white">
          <h1 style="margin:0;font-size:24px">🔗 LinkUp</h1>
        </div>
        <div style="padding:30px;background:white">
          <p style="font-size:16px;margin-bottom:20px"><strong>Hello,</strong></p>
          <p style="margin-bottom:20px">We received a request to reset your password for your <strong>LinkUp</strong> account.</p>
          <p style="margin-bottom:10px">Your password reset code is:</p>
          <div style="background:#f5f5f5;padding:20px;text-align:center;margin:20px 0;border-radius:8px;border:2px solid #ddd">
            <span style="font-size:32px;font-weight:bold;color:#333;letter-spacing:3px;font-family:monospace">🔒 ${passwordResetCode}</span>
          </div>
          <div style="background:#f8f8f8;padding:15px;margin:20px 0;border-radius:5px;border:1px solid #ddd">
            <span style="color:#666">⏰ This code is valid for the next <strong>10 minutes</strong>.</span>
          </div>
          <div style="background:#f8f9fa;padding:15px;margin:20px 0;border-left:4px solid #888;border-radius:0 5px 5px 0">
            <p style="margin:0;font-size:14px;color:#555">🛡️ If you did not request this, please ignore this email. Your account will remain secure.</p>
          </div>
          <p style="margin-top:30px">Thanks,<br><strong style="color:#4a4a4a">The LinkUp Team</strong></p>
        </div>
      </div>
    `,
  });

  // Send the response
  res.status(200).json({
    status: "success",
    message: "Reset code sent to email",
  });
});

export const verifyPasswordRestCode = catchAsync(async (req, res, next) => {
  const { passwordResetCode } = req.body;

  // Check if the password reset code is provided
  if (!passwordResetCode) {
    return next(new AppError("Please provide a password reset code", 400));
  }

  // Find the user by the password reset code
  const user = await User.findOne({
    passwordResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If no user found or code expired, return an error
  if (!user) {
    return next(new AppError("Invalid or expired password reset code", 400));
  }

  // Send success response
  res.status(200).json({
    status: "success",
    message: "Password reset code is valid",
  });
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm, passwordResetCode } = req.body;

  // Check if the password reset code is provided
  if (!passwordResetCode) {
    return next(new AppError("Please provide a password reset code", 400));
  }

  // Find the user by the password reset code
  const user = await User.findOne({
    passwordResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If no user found or code expired, return an error
  if (!user) {
    return next(new AppError("Invalid or expired password reset code", 400));
  }

  // Validate the new password and confirm-password
  if (!password || !passwordConfirm) {
    return next(
      new AppError("Please provide both password and confirm password", 400)
    );
  }

  if (password !== passwordConfirm) {
    return next(new AppError("Password don't match", 400));
  }

  // Check password length
  if (password.length < 8) {
    return next(
      new AppError("Password must be at least 8 characters long", 400)
    );
  }

  // Update the user's password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetCode = undefined; // Clear the reset code
  user.passwordResetExpires = undefined; // Clear the expiration date
  await user.save();

  // Send token to client
  createSendTokenCookie(user, 200, res); // Log the user in after reset
});
