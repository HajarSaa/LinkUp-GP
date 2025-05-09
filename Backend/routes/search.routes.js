import express from "express";
import mongoose from "mongoose";

const router = express.Router();
import Message from "../models/message.model.js";

router.get("/search", async (req, res) => {
  const { keyword, user, channel, startDate, endDate } = req.query;

  try {
    const query = {};

    // Keyword search
    if (keyword) {
      query.content = { $regex: keyword, $options: "i" };
    }

    // Filter by user (using sentBy field)
    if (user) {
      try {
        query.sentBy = new mongoose.Types.ObjectId(user);
      } catch (err) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
    }

    // Filter by channel (using channelId field)
    if (channel) {
      try {
        query.channelId = new mongoose.Types.ObjectId(channel);
      } catch (err) {
        return res.status(400).json({ error: "Invalid channel ID format" });
      }
    }

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    console.log("Final query:", query); // For debugging

    const results = await Message.find(query)
      .sort({ createdAt: -1 })
      .populate("sentBy", "username email")
      .populate("channelId", "name");

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to search messages" });
  }
});

export default router;
