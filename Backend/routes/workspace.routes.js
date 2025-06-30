import express from "express";
import {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  deleteWorkspace,
  joinWorkspace,
  updateWorkspace,
  leaveWorkspace,
  signOutWorkspace,
  inviteToWorkspace,
  acceptInvite,
} from "../controllers/workspace.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/uploadAvatarMiddleware.js";
const router = express.Router();

router.use(protect);

router
  .get("/", getAllWorkspaces)
  .post("/", createWorkspace)
  .get("/:id", getWorkspace)
  .post("/:id/join", uploadAvatar, joinWorkspace);

router.use(protectAttchWorkspace);

router
  .post("/acceptInvite", acceptInvite)
  .post("/signout", signOutWorkspace)
  .patch("/:id", updateWorkspace)
  .delete("/:id", deleteWorkspace)
  .post("/:id/leave", leaveWorkspace)
  .post("/:id/invite", inviteToWorkspace);

export default router;
