import express from "express";
import uploader from "../middlewares/uploadFileMiddleware.js";

import {
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateMyProfile,
  updateUserProfile,
  updateUserImage,
} from "../controllers/userProfile.controller.js";

import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = uploader();

router.use(protect);
router.use(protectAttchWorkspace);

router
  .get("/", getAllUserProfiles)
  .get("/:id", getUserProfile)
  .patch("/updateMe", updateMyProfile)
  .patch("/updateUserImage", upload.single("photo"), updateUserImage);

export default router;
