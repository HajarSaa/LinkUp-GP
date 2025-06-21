import express from "express";
import {
  protect,
  protectAttchWorkspace,
} from "../middlewares/authMiddleware.js";
import {
  creatReaction,
  deleteReaction,
  getReactions,
} from "../controllers/reaction.controller.js";

const router = express.Router();

router.use(protect);
router.use(protectAttchWorkspace);

router
  .post("/:id", creatReaction)
  .get("/:id", getReactions)
  .delete("/:id", deleteReaction);

export default router;
