import express from "express";
import { uploadFile } from "../controllers/file.controller.js";
import uploader from "../middlewares/uploadFileMiddleware.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);
//router.use(protectAttchWorkspace);   // After upload.single cause this middleware convert the json to form data.

const upload = uploader();
// 📌 Route: Upload File
router.post(
  "/upload",
  upload.array("file"),
  // (req, res, next) => {
  //   console.log(req.files);
  //   //next();
  // },
  uploadFile
);

export default router;
