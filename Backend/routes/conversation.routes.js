import express from "express";
import {
  getAllConversations,
  getConversation,
} from "../controllers/conversation.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .get("/", getAllConversations)
  .get("/:id", getConversation)

export default router;
