import Product from "../models/product.model";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      imageURL,
      price,
      stock,
      sellerId,
      categoryId,
      stateOfProduct,
    } = req.body;

    if (
      !name ||
      !description ||
      !imageURL ||
      !price ||
      !stock ||
      !sellerId ||
      !categoryId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      description,
      imageURL,
      price,
      stock,
      averageRating: 0,
      sellerId,
      categoryId,
      stateOfProduct,
    });
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "product created successfully", product: savedProduct });
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllProducts = async (req, res) => {};
export const getSingleProduct = async (req, res) => {};
export const getMyProducts = async (req, res) => {};
export const updateAProduct = async (req, res) => {};
export const deleteAProduct = async (req, res) => {};
