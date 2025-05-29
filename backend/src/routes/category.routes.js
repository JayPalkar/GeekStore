import express from "express";
import {
  createCategory,
  getAllCategories,
  getProductsByCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:categoryId/products", getProductsByCategory);

export default router;
