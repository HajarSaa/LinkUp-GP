import express from "express";
import { uploadFile } from "../controllers/file.controller.js";
import uploader from "../middlewares/uploadFileMiddleware.js";
import { simulateUserIfMissing } from "../middlewares/simulateUser.middleware.js";

import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
// router.use(simulateUserIfMissing); for testing purpose
router.use(protect);
router.use(protectAttchWorkspace);

const upload = uploader();
// 📌 Route: Upload File
router.post("/upload", upload.array("files"), uploadFile);

export default router;
