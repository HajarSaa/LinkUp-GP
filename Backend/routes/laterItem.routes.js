import express from "express";
import { getLaterItems } from "../controllers/laterItem.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(protectAttchWorkspace);

router.get("/", getLaterItems);

export default router;
