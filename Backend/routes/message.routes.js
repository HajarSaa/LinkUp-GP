import express from "express";
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router
  .get("/", getAllMessages)
  .post("/", createMessage)
  .get("/:id", getMessage)
  .patch("/:id", updateMessage)
  .delete("/:id", deleteMessage);

export default router;
