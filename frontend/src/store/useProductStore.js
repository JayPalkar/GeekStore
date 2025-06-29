import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProductStore = create((set) => ({
  allProducts: [],
  myProducts: [],
  product: null,
  isGettingProduct: false,
  isCreatingProduct: false,
  isUpdatingProduct: false,
  isDeletingProduct: false,

  getAllProduct: async () => {
    set({ isGettingProduct: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ allProducts: res.data });
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isGettingProduct: false });
    }
  },

  getSingleProduct: async (productId) => {
    try {
      const res = await axiosInstance.get(`/products/${productId}`);
      set({ product: res.data });
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isGettingProduct: false });
    }
  },

  getMyProducts: async () => {
    set({ isGettingProduct: true });
    try {
      const res = await axiosInstance.get("/products/my-products");
      set({ myProducts: res.data });
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isGettingProduct: false });
    }
  },

  createAProduct: async (data) => {
    set({ isCreatingProduct: true });
    try {
      const res = await axiosInstance.post("/products/create-product", data);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isCreatingProduct: false });
    }
  },

  updateAProduct: async (data, productId) => {
    set({ isUpdatingProduct: true });
    try {
      await axiosInstance(`/products/my-products/${productId}`, data);
      toast.success("Product Updated Successfully");
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isUpdatingProduct: false });
    }
  },

  deleteAProduct: async (productId) => {
    set({ isDeletingProduct: true });
    try {
      const res = await axiosInstance.delete(
        `/products/my-products/${productId}`
      );
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isDeletingProduct: false });
    }
  },
}));
