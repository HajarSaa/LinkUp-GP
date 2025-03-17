import express from "express";

import {
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userProfile.controller.js";

import { protect } from "../middlewares/authMiddleware.js";
import { attachUserData } from "../utils/attchData.js";

const router = express.Router();

router.use(protect);

router
  .get("/", getAllUserProfiles)
  .post("/", attachUserData({ user: "id", email: "email" }), createUserProfile)
  .get("/:id", getUserProfile)
  .patch("/:id", updateUserProfile)
  .delete("/:id", deleteUserProfile);

export default router;
