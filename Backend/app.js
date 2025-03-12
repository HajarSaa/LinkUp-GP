import express from "express";
import morgan from "morgan";

import userRouter from "./routes/user.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import channelRouter from "./routes/channel.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
import authRouter from "./routes/auth.routes.js";
import userProfileRouter from "./routes/userProfile.routes.js";
import AppError from "./utils/appError.js";
import { globalErrorHandeler } from "./utils/globalErrorHandeler.js";

const app = express();

// body parser -> read data from body int req.body
app.use(express.json());
// logger
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/userProfiles", userProfileRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);

// app.use("/api/v1/files", );
// Integration -> off
// Notification -> off

// 404 route handeler middleware
app.all("*", (req, res, next) => {
  // res.send("ERORR: 404 NOT FOUND");
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handeler middleware
app.use(globalErrorHandeler);

export default app;
