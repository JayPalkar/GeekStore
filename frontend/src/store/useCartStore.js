import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useCartStore = create((set) => ({
  cart: null,
  isLoadingCart: false,
  isAddingItem: false,
  isUpdatingCart: false,
  isDeletingCartItem: false,

  getShoppingCart: async () => {
    set({ isLoadingCart: true });
    try {
      const res = await axiosInstance.get("/cart/");
      set({ cart: res.data });
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isLoadingCart: false });
    }
  },

  addItemToCart: async (data) => {
    set({ isAddingItem: true });
    try {
      const res = await axiosInstance.post("/cart/", data);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isAddingItem: false });
    }
  },

  updateCartItem: async (data, productId) => {
    set({ isUpdatingCart: true });
    try {
      await (`/cart/${productId}`, data);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isUpdatingCart: false });
    }
  },

  deleteCartItem: async (productId) => {
    set({ isDeletingCartItem: true });
    try {
      await axiosInstance.delete(`/cart/${productId}`);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isDeletingCartItem: false });
    }
  },
}));
