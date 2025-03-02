import express from "express";
import {
  addUserAddress,
  becomeASeller,
  deleteUserProfile,
  getUserProfile,
  updateUserAddress,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getUserProfile);
router.post("/address", protectRoute, addUserAddress);
router.put("/address/:addressId", protectRoute, updateUserAddress);
router.put("/become-a-seller", protectRoute, becomeASeller);
router.delete("/", protectRoute, deleteUserProfile);

export default router;
