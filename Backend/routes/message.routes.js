import express from "express";
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  getChannelMessages,
  getConversationMessages,
  getThread,
} from "../controllers/message.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(protectAttchWorkspace);

router
  .get("/", getAllMessages)
  .get("/channelMessages/:id", getChannelMessages)
  .get("/conversationMessages/:id", getConversationMessages)
  .get("/thread/:id", getThread)
  .get("/:id", getMessage)
  .post("/", createMessage)
  .patch("/:id", updateMessage)
  .delete("/:id", deleteMessage);

export default router;
