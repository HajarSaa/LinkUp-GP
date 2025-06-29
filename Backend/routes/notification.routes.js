import express from "express";
import {
  getAllNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../controllers/notification.controller.js";

import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(protectAttchWorkspace);

router.get("/", getAllNotifications);
router.patch("/:id/mark-read", markNotificationAsRead);
router.patch("/mark-all-read", markAllNotificationsAsRead);

export default router;
