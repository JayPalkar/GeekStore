import express from "express";
import { protectRoute } from "../middlewares/authentication.middleware";
import {
  createProduct,
  deleteAProduct,
  getAllProducts,
  getMyProducts,
  getSingleProduct,
  updateAProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.post("/create-product", protectRoute, createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getSingleProduct);
router.get("/my-products", protectRoute, getMyProducts);
router.put("/my-products/:productId", protectRoute, updateAProduct);
router.delete("/my-products/:productId", protectRoute, deleteAProduct);

export default router;
