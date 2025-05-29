import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCategory = new Category({ name });

    await newCategory.save();

    res
      .status(201)
      .json({ message: "new category created", name: newCategory });
  } catch (error) {
    console.log("Error in createCategory controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error  in getAllCategories:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const products = await Product.find({ categoryId }).populate("categoryId");

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
