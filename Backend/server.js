import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import socketServer from "./servers/socketServer.js";

dotenv.config({ path: "./config.env" });

// Connecting to database
const DB = process.env.DATABASE;
mongoose.connect(DB, {}).then(() => console.log("DB connection successful!"));

const port = process.env.PORT;
// create HTTP server, attach Socket.IO to.
const server = http.createServer(app);
const io = socketServer(server);

// expose "io" (to be used in controllers)
app.set("io", io);

server.listen(port, () => {
  console.log(`Server running on port ${port} -> http://127.0.0.1:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION ❌");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION ❌");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
