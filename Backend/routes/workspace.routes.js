import express from "express";
import {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addUserToWorkspace,
} from "../controllers/workspace.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";
import { attachUserData, attachUserProfileData } from "../utils/attchData.js";
import channelRouter from "./channel.routes.js";
const router = express.Router();

router.use(protect);

// Re-route into channel router
router.use("/:workspaceId/channels", channelRouter);

router.get("/:id", getWorkspace);

router
  .get("/", getAllWorkspaces)
  .post("/", attachUserData({ createdBy: "id" }), createWorkspace)
  .patch("/:id", updateWorkspace)
  .delete("/:id", deleteWorkspace)
  .post("/addUser", addUserToWorkspace);

export default router;
