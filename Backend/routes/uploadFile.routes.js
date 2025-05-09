import express from "express";
import { uploadFile } from "../controllers/file.controller.js";
import uploader from "../middlewares/uploadFileMiddleware.js";
import { simulateUserIfMissing } from "../middlewares/simulateUser.middleware.js";

import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.use(protectAttchWorkspace);

const upload = uploader();
// 📌 Route: Upload File
router.post(
  "/upload",
  simulateUserIfMissing,
  upload.array("files"),
  // (req, res, next) => {
  //   console.log(req.files);
  //   //next();
  // },
  uploadFile
);

export default router;
