import express from "express";
import { protectRoute } from "../middlewares/authentication.middleware.js";
import {
  AddReview,
  deleteAReview,
  getAllReviewsForAProduct,
  getLatestReviewsForAProduct,
  updateAReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/:productId", protectRoute, AddReview);
router.get("/:productId/latest", getLatestReviewsForAProduct);
router.get("/:productId", getAllReviewsForAProduct);
router.put("/:reviewId", protectRoute, updateAReview);
router.delete("/:reviewId", protectRoute, deleteAReview);

export default router;
