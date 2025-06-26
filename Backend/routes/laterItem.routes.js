import express from "express";
import {
  getLaterItems,
  toggleSaveForLater,
  updateLaterItemStatus,
  setLaterReminder,
  removeLaterReminder,
} from "../controllers/laterItem.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(protectAttchWorkspace);

router.get("/", getLaterItems);
router
  .patch("/:id/toggle", toggleSaveForLater)
  .patch("/:id/status", updateLaterItemStatus)
  .patch("/:id/setReminder", setLaterReminder)
  .patch("/:id/removeReminder", removeLaterReminder);

export default router;
