import express from "express";
import { fileURLToPath } from "url";
import path from "path";

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

// ✅ Trust proxy (important for Vercel and rate limiters)
app.set("trust proxy", 1);

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

// Welcome route for testing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "welcome.html"));
});


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

// TODO - allow getting messages using pagination

// TODO - Implement middlewares to check if the user is member of the (channel,conversation) or not
// TODO - add the validation resouces on all post requests across all controllers

// ------------------------------------------------ next -------------------------------------------------- //

// TODO - Add functionality of user deleting his account (deleteMe)
// TODO - Add functionality of user updating his password (updatePassword)
// TODO - Implement the forget password and reset Password functionality
