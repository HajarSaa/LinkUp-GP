import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";

// Routes imports
import userRouter from "./routes/user.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import channelRouter from "./routes/channel.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
import searchRoutes from "./routes/search.routes.js";
import authRouter from "./routes/auth.routes.js";
import userProfileRouter from "./routes/userProfile.routes.js";
import uploadRouter from "./routes/uploadFile.routes.js";

// Error handling imports
import AppError from "./utils/appError.js";
import { globalErrorHandeler } from "./utils/globalErrorHandeler.js";
import middlewares from "./middlewares/middlewares.js";

const app = express();

// Trust proxy (important for Vercel and rate limiters)
app.set("trust proxy", 1);

// Middlewares
middlewares(app);
app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/userProfiles", userProfileRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/files", uploadRouter);
app.use("/api", searchRoutes);

// 404 route handler middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler middleware
app.use(globalErrorHandeler);

export default app;
