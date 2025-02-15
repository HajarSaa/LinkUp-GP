import express from "express";
import {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspaceController.js";

const router = express.Router();

router
  .get("/", getAllWorkspaces)
  .post("/", createWorkspace)
  .get("/:id", getWorkspace)
  .patch("/:id", updateWorkspace)
  .delete("/:id", deleteWorkspace);

export default router;
