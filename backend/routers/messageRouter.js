import express from "express";
import {
  createMessage,
  getAllChatMessages,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createMessage);
router.route("/fetch").post(authMiddleware, getAllChatMessages);
export default router;
