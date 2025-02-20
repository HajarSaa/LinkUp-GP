import express from "express";
import {
  getAllConversations,
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router
  .get("/", getAllConversations)
  .post("/", createConversation)
  .get("/:id", getConversation)
  .patch("/:id", updateConversation)
  .delete("/:id", deleteConversation);

export default router;
