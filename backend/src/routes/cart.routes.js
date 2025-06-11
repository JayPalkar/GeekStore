import express from "express";
import {
  addItemToCart,
  deleteCartItem,
  getShoppingCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getShoppingCart);
router.post("/", addItemToCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", deleteCartItem);

export default router;
