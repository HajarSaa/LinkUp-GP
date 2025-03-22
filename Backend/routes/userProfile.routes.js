import express from "express";

import {
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateMyProfile,
  updateUserProfile,
} from "../controllers/userProfile.controller.js";

import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";
import { attachUserData } from "../utils/attchData.js";

const router = express.Router();

router.use(protect);
router.post(
  "/",
  attachUserData({ user: "id", email: "email" }),
  createUserProfile
);

router.use(protectAttchWorkspace);
router
  .get("/", getAllUserProfiles)
  .delete("/:id", deleteUserProfile)
  .patch("/updateMe", updateMyProfile)
  .get("/:id", getUserProfile);

export default router;
