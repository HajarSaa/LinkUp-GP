import express from "express";
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  validateMessageData,
} from "../controllers/message.controller.js";
import { attachUserProfileData } from "../utils/attchData.js";
import { protect, protectAttchWorkspace } from "../middlewares/authMiddleware.js";
import { validateResources } from "../utils/validateResources.js";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(protectAttchWorkspace);

router
  .get("/", getAllMessages)
  .post("/", attachUserProfileData(), validateMessageData, createMessage)
  .get("/:id", getMessage)
  .patch("/:id", updateMessage)
  .delete("/:id", deleteMessage);

export default router;
