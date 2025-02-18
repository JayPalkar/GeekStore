import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
} from "../controllers/authentication.controller.js";
import { protectRoute } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/checkAuth", protectRoute, checkAuth);

export default router;
