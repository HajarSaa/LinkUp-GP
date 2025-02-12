import express from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers).post("/", createUser);

export default router;
