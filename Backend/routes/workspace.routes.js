import express from "express";
import {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace,
} from "../controllers/workspace.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(protect);

router.get("/:id", getWorkspace);

router
  .get("/", getAllWorkspaces)
  .post("/", createWorkspace)
  .patch("/:id", updateWorkspace)
  .delete("/:id", deleteWorkspace)
  .post("/:id/join", joinWorkspace);

export default router;
