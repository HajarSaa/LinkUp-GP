import express from "express";

import {
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userProfile.controller.js";

import { protect, protectAttchWorkspace } from "../middlewares/authMiddleware.js";
import { attachUserData } from "../utils/attchData.js";

const router = express.Router();

router.use(protect);
router.post("/", attachUserData({ user: "id", email: "email" }), createUserProfile)

router.use(protectAttchWorkspace);
router
  .get("/", getAllUserProfiles)
  .patch("/:id", updateUserProfile)
  .delete("/:id", deleteUserProfile)
  .get("/updateme") // TODO- implement updateMe
  .get("/:id", getUserProfile);

export default router;
