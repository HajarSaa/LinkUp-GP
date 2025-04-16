import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getMe,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

router
  .get("/", getAllUsers)
  .post("/", createUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser)
  .get("/me", getMe)
  .get("/:id", getUser);

export default router;
