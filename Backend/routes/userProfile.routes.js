import express from "express";

import {
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userProfile.controller.js";

const router = express.Router();

router
  .get("/", getAllUserProfiles)
  .post("/", createUserProfile)
  .get("/:id", getUserProfile)
  .patch("/:id", updateUserProfile)
  .delete("/:id", deleteUserProfile);

export default router;
