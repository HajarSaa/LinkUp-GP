import express from "express";
import {
  getAllConversations,
  getConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router
  .get("/", getAllConversations)
  .get("/:id", getConversation)

export default router;
