import express from "express";
import {
  getAllConversations,
  getConversation,
} from "../controllers/conversation.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import messageRouter from "./message.routes.js";

const router = express.Router();

router.use(protect);

// Re-route into message router
router.use("/:conversationId/messages", messageRouter);

router.get("/", getAllConversations).get("/:id", getConversation);

export default router;
