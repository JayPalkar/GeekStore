import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useCategoryStore = create((set) => ({
  products: [],
  allCategories: [],
  category: null,
  isCreatingCategory: false,
  isGettingCategory: false,
  isGettingProductsByCategory: false,

  createCategory: async (data) => {
    set({ isCreatingCategory: true });
    try {
      const res = await axiosInstance.post("/categories/", data);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isCreatingCategory: false });
    }
  },

  getAllCategories: async () => {
    set({ isGettingCategory: true });
    try {
      const res = await axiosInstance.get("/categories/");
      set({ allCategories: res.data });
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isGettingCategory: false });
    }
  },

  getProductsByCategory: async (categoryId) => {
    set({ isGettingProductsByCategory: true });
    try {
      const res = await axiosInstance.get(`/categories/${categoryId}/products`);
      set({ products: res.data });
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isGettingProductsByCategory: false });
    }
  },
}));
