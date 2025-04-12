import express from "express";

import userRouter from "./routes/user.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import channelRouter from "./routes/channel.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
import authRouter from "./routes/auth.routes.js";
import userProfileRouter from "./routes/userProfile.routes.js";
import uploadRouter from "./routes/uploadFile.routes.js";
import AppError from "./utils/appError.js";
import { globalErrorHandeler } from "./utils/globalErrorHandeler.js";
import middlewares from "./middlewares/middlewares.js";

const app = express();

// Add middlewares to the app
middlewares(app);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/userProfiles", userProfileRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/files", uploadRouter);

// 404 route handeler middleware
app.all("*", (req, res, next) => {
  // res.send("ERORR: 404 NOT FOUND");
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handeler middleware
app.use(globalErrorHandeler);

export default app;

// ------------------------------------------------ NOW -------------------------------------------------- //

// TODO - populate everything ¬_¬ also virtuals //  (channel - conversation ) Done
// TODO - Implement deletion of workspace and
// TODO - handle deleting the workspace from every user's workspace array
// TODO - handle deleting all conversations and channels associated with the workspace
// TODO - handle deleting conversation -> only messages are deleted

// ------------------------------------------------ next -------------------------------------------------- //
// TODO - Implement middlewares to check if the user is member of the (channel,conversation) or not
// TODO - Implement update controllers for workspace , channels, messages (like updateMyProfile)

// TODO - Implement virtual populate for the messages in channel and conversation
// TODO - allow getting messages using pagination

// TODO - separate the logic of adding a user to a workspace into add and join
// TODO - add -> the admins or owner can add a user to the workspace
// TODO - join -> the user can join a workspace using a join code

// TODO - Add functionality of user deleting his account (deleteMe)
// TODO - Add functionality of user updating his password (updatePassword)
// TODO - Implement the forget password and reset Password functionality

// TODO - Edit the conversations logic (not to be created automatically when user joins)
// TODO - Instead, the user creates a converation between him and another member

// TODO - add the validation resouces on all post requests across all controllers

// TODO - How to handle settings of the workspace like theme, notifications, limits, etc
// TODO - Search how to store settings
// TODO - Add default settings
