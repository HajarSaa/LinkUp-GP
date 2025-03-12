import express from "express";
import {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.use(protect);

router
  .get("/", getAllWorkspaces)
  .post("/", createWorkspace)
  .get("/:id", getWorkspace)
  .patch("/:id", updateWorkspace)
  .delete("/:id", deleteWorkspace);

export default router;
