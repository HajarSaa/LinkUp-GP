import expres from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = expres.Router();

router.post("/signup", signup).post("/login", login);

router.use(protect);
router.post("/logout", logout);
export default router;
