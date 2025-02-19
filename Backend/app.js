import express from "express";
import userRouter from "./routes/user.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import channelRouter from "./routes/channel.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import messageRouter from "./routes/message.routes.js";

const app = express();

// body parser -> read data from body int req.body
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);

// app.use("/api/v1/files", );
// Integration -> off
// Notification -> off

app.all("*", (req, res) => {
  res.send("ERORR: 404 NOT FOUND");
});
0;

export default app;
