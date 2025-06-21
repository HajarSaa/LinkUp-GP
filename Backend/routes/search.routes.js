import express from "express";
import { searchMessages } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", searchMessages);

export default router;
