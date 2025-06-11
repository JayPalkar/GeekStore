import express from "express";
import { protectRoute } from "../middlewares/authentication.middleware.js";
import {
  cancelOrder,
  getSingleOrder,
  getUserOrders,
  placeOrder,
  trackOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protectRoute, placeOrder);
router.get("/", protectRoute, getUserOrders);
router.get("/:orderId", protectRoute, getSingleOrder);
router.put("/:orderId/cancel", protectRoute, cancelOrder);
router.get("/:orderId/tracking", protectRoute, trackOrder);
router.put("/:orderId/status", protectRoute, updateOrderStatus);

export default router;
