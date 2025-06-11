import { truncates } from "bcryptjs";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

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
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getALlProducts controller ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error in getALlProducts: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getMyProducts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const user = await User.findById(loggedInUser).select("role");

    if (!user || user.role !== "seller") {
      res.status(404).json({
        message:
          "You are not a seller Update your profile to create and view your products",
      });
    }

    const myProducts = await Product.find({ sellerId: loggedInUser });

    if (myProducts.length === 0) {
      res
        .status(404)
        .json({ message: "No Products Found, Try creating a new product" });
    }

    res.status(200).json(myProducts);
  } catch (error) {
    console.error("Error in getMyProducts Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateAProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, imageURL, price, stock, stateOfProduct } =
      req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        imageURL,
        price,
        stock,
        stateOfProduct,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in updateAProduct Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ message: "Product deleted successfully: ", deletedProduct });
  } catch (error) {
    console.error("Error in deleteAProduct Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
