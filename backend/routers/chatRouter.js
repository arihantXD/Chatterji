import express from "express";
import {
  createChat,
  getChatById,
  getChatsByUserId,
} from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(authMiddleware, createChat);
router.route("/:id").get(authMiddleware, getChatsByUserId);
router.route("/getChat/:id").get(authMiddleware, getChatById);

export default router;
