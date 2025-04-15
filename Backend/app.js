import express from "express";
import morgan from "morgan";

import userRouter from "./routes/user.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import channelRouter from "./routes/channel.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";
import searchRoutes from "./routes/search.routes.js";

const app = express();

// body parser -> read data from body int req.body

app.use(express.json());
// logger
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api", searchRoutes);

// app.use("/api/v1/files", );
// Integration -> off
// Notification -> off

app.all("*", (req, res) => {
  res.send("ERORR: 404 NOT FOUND");
});

export default app;
