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
  .patch("/:id", updateWorkspace)
  .delete("/:id", deleteWorkspace)
  .post("/:id/leave", leaveWorkspace)
  .post("/signout", signOutWorkspace);

export default router;
  