import express from "express";
import {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  deleteWorkspace,
  joinWorkspace,
} from "../controllers/workspace.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadAvatar } from "../middlewares/uploadAvatarMiddleware.js";
const router = express.Router();

router.use(protect);

router
  .get("/", getAllWorkspaces)
  .get("/:id", getWorkspace)
  .post("/", createWorkspace)
  .delete("/:id", deleteWorkspace)
  .post("/:id/join", uploadAvatar, joinWorkspace);

export default router;
