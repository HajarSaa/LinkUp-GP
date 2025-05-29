import express from "express";
import { getAllFiles } from "../controllers/file.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(protectAttchWorkspace);

router.get("/", getAllFiles);

export default router;
