import express from "express";
import uploader from "../middlewares/uploadFileMiddleware.js";

import {
  createUserProfile,
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateUserProfile,
  updateUserImage,
} from "../controllers/userProfile.controller.js";

import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";
import { attachUserData } from "../utils/attchData.js";

const router = express.Router();
const upload = uploader();

router.use(protect);
router.post(
  "/",
  attachUserData({ user: "id", email: "email" }),
  createUserProfile
);

//router.use(protectAttchWorkspace);

router
  .get("/", getAllUserProfiles)
  .patch("/:id", updateUserProfile)
  .delete("/:id", deleteUserProfile)
  .patch("/updateme") // TODO- implement updateMe
  .get("/:id", getUserProfile)
  .patch("/updateUserImage", upload.single("photo"), updateUserImage);

export default router;
