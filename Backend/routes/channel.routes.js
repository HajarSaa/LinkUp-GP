import express from "express";
import {
  getAllChannels,
  getChannel,
  createChannel,
  updateChannel,
  deleteChannel,
} from "../controllers/channel.controller.js";

const router = express.Router();

router
  .get("/", getAllChannels)
  .post("/", createChannel)
  .get("/:id", getChannel)
  .patch("/:id", updateChannel)
  .delete("/:id", deleteChannel);

export default router;
