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
  getChannelPinnedMessages,
  getConversationPinnedMessages,
  togglePinMessage,
  forwardMessage,
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
  .get("/channelPinnedMessages/:id", getChannelPinnedMessages)
  .get("/conversationPinnedMessages/:id", getConversationPinnedMessages)
  .get("/thread/:id", getThread)
  .get("/:id", getMessage)
  .post("/", createMessage)
  .post("/forward", forwardMessage)
  .patch("/:id", updateMessage)
  .patch("/:id/pin", togglePinMessage)
  .delete("/:id", deleteMessage);

export default router;
