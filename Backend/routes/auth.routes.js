import expres from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = expres.Router();

router.post("/signup", signup).post("/login", login);
export default router;
