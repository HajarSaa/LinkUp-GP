import express from "express";
import {
  getAllChannels,
  getChannel,
  createChannel,
  updateChannel,
  deleteChannel,
} from "../controllers/channel.controller.js";
import { attachUserProfileData } from "../utils/attchData.js";
import { protect } from "../middlewares/authMiddleware.js";
import messageRouter from "./message.routes.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

// Re-route into message router
router.use("/:channelId/messages", messageRouter);

router
  .get("/", getAllChannels)
  .post("/", attachUserProfileData(), createChannel)
  .get("/:id", getChannel)
  .patch("/:id", updateChannel)
  .delete("/:id", deleteChannel);

export default router;
