import express from "express";
import {
  getAllChannels,
  getChannel,
  createChannel,
  updateChannel,
  deleteChannel,
  joinChannel,
  leaveChannel,
} from "../controllers/channel.controller.js";
import { attachUserProfileData } from "../utils/attchData.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";
import messageRouter from "./message.routes.js";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(protectAttchWorkspace);

// Re-route into message router
router.use("/:channelId/messages", messageRouter);

router
  .get("/", getAllChannels)
  .post("/", attachUserProfileData("createdBy"), createChannel)
  .get("/:id", getChannel)
  .patch("/:id", updateChannel)
  .delete("/:id", deleteChannel)
  .post("/:id/join", attachUserProfileData("userId"), joinChannel)
  .post("/:id/leave", attachUserProfileData("userId"), leaveChannel);

export default router;
