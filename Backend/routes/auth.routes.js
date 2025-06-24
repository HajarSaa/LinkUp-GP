import expres from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyPasswordRestCode,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = expres.Router();

router
  .post("/signup", signup)
  .post("/login", login)
  .post("/forgotPassword", forgotPassword)
  .post("/verifyResetCode", verifyPasswordRestCode)
  .post("/resetPassword", resetPassword);

router.use(protect);
router.post("/logout", logout);
export default router;
