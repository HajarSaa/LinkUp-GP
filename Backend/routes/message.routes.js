import express from "express";
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
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
  .post("/", createMessage)
  .get("/:id", getMessage)
  .patch("/:id", updateMessage)
  .delete("/:id", deleteMessage);

export default router;
