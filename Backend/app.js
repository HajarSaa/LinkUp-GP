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
import fileRouter from "./routes/file.routes.js";
import reactionRouter from "./routes/reaction.routes.js";
import laterItemRouter from "./routes/laterItem.routes.js";
import notificationRouter from "./routes/notification.routes.js";
// import googleRoutes from "./services/google/googleRoutes.js";
// import webhookRoutes from "./webhook.route.js";

// Error handling imports
import AppError from "./utils/appError.js";
import { globalErrorHandeler } from "./utils/globalErrorHandeler.js";
import middlewares from "./middlewares/middlewares.js";

// Get the current directory name.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Trust proxy (important for Vercel and rate limiters)
app.set("trust proxy", 1);

// to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
// Add middlewares to the app
middlewares(app);
app.use(morgan("dev"));
app.use(express.json());
// app.use(webhookRoutes);

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/userProfiles", userProfileRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/uploads", uploadRouter);
app.use("/api/v1/files", fileRouter);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/reactions", reactionRouter);
app.use("/api/v1/laterItems", laterItemRouter);
app.use("/api/v1/notifications", notificationRouter);
// app.use("/api/google", googleRoutes);

// 404 route handler middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handler middleware
app.use(globalErrorHandeler);

export default app;
