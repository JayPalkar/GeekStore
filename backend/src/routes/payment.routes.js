import express from "express";
import { protectRoute } from "../middlewares/authentication.middleware.js";
import {
  initiatePayment,
  verifyPaymentStatus,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", protectRoute, initiatePayment);
router.get("/:orderid", protectRoute, verifyPaymentStatus);

export default router;
