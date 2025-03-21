import express from "express";
import { uploadFile } from "../controllers/file.controller.js";
import uploader from "../middlewares/uploadFileMiddleware.js";
import { protect, protectAttchWorkspace } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.use(protectAttchWorkspace);


const upload = uploader();
// 📌 Route: Upload File
router.post(
  "/upload",
  upload.single("file"),
  // (req, res, next) => {
  //   console.log(req.file);
  //   next();
  // },
  uploadFile
);

export default router;
