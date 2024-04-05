import express, { json } from "express";
import {
  findUsers,
  userInfo,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/login").post(userLogin);
router.route("/register").post(userRegister);
router.route("/user").get(authMiddleware, userInfo);
router.route("/findUsers").post(authMiddleware, findUsers);
router.route("/logout").post(authMiddleware, userLogout);

export default router;
