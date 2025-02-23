import express from "express";
import { protectRoute } from "../middlewares/authentication.middleware";

const router = express.Router();

router.get("/", protectRoute, getUserProfile);
router.put("/", protectRoute, updateUserProfile);
router.put("/become-a-seller", protectRoute, becomeASeller);
router.delete("/", protectRoute, deleteUserProfile);

export default router;
