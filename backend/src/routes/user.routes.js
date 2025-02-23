import express from "express";

const router = express.Router();

router.get("/", authenticationMiddleware, getUserProfile);
router.put("/", authenticationMiddleware, updateUserProfile);
router.put("/become-a-seller", authenticationMiddleware, becomeASeller);
router.delete("/", authenticationMiddleware, deleteUserProfile);

export default router;
