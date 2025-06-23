import express from "express";
import { searchMessages } from "../controllers/search.controller.js";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.use(protectAttchWorkspace);

router.get("/", searchMessages);

export default router;
