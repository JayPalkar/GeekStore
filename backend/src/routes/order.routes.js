import express from "express";
import { protectRoute } from "../middlewares/authentication.middleware.js";
import {
  cancelOrder,
  getSingleOrder,
  getUserOrders,
  placeOrder,
  trackOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protectRoute, placeOrder);
router.get("/", protectRoute, getUserOrders);
router.get("/:orderId", protectRoute, getSingleOrder);
router.put("/:orderId/cancel", protectRoute, cancelOrder);
router.get("/:orderId/tracking", protectRoute, trackOrder);

export default router;
