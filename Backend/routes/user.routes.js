import express from "express";
import { getAllUsers, getMe } from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", getAllUsers).get("/me", getMe);

export default router;
