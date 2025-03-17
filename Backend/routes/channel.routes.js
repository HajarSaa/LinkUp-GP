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

const router = express.Router();

router.use(protect);

router
  .get("/", getAllChannels)
  .post("/", attachUserProfileData(), createChannel)
  .get("/:id", getChannel)
  .patch("/:id", updateChannel)
  .delete("/:id", deleteChannel);

export default router;
