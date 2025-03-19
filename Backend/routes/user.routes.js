import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

router
  .get("/", getAllUsers)
  .post("/", createUser)
  .get("/:id", getUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default router;
