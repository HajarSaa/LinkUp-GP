import express from "express";
import {
  getAllWorkspaces,
  getWorkspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addUserToWorkspace,
} from "../controllers/workspace.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { attachUserData } from "../utils/attchData.js";

const router = express.Router();

router.use(protect);

router
  .get("/", getAllWorkspaces)
  .post("/", attachUserData({ createdBy: "id" }), createWorkspace)
  .get("/:id", getWorkspace)
  .patch("/:id", updateWorkspace)
  .delete("/:id", deleteWorkspace)
  .post("/addUser", addUserToWorkspace);

export default router;
