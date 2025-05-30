import express from "express";
import { getAllFiles, deleteFile } from "../controllers/file.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(protectAttchWorkspace);

router.get("/", getAllFiles).delete("/:id", deleteFile);
export default router;
