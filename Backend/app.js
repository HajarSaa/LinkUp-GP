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

// 404 route handeler middleware
app.all("*", (req, res, next) => {
  // res.send("ERORR: 404 NOT FOUND");
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handeler middleware
app.use(globalErrorHandeler);

export default app;

// ------------------------------------------------ NOW -------------------------------------------------- //

// TODO - populate everything ¬_¬ also virtuals //  (channel - conversation ) Done ✅

// TODO - allow getting messages using pagination ✅

// TODO - add the validation resouces on all post requests across all controllers ✅

// ------------------------------------------------ next -------------------------------------------------- //
