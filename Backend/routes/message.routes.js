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
  getChannelMedia,
  getConversationMedia,
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
  .get("/channelMedia/:id", getChannelMedia)
  .get("/conversationMessages/:id", getConversationMessages)
  .get("/conversationMedia/:id", getConversationMedia)
  .get("/thread/:id", getThread)
  .get("/:id", getMessage)
  .post("/", createMessage)
  .patch("/:id", updateMessage)
  .delete("/:id", deleteMessage);

export default router;
