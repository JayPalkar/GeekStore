import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  isPlacingOrder: false,
  isFetchingOrders: false,
  isUpdatingOrder: false,
  isTrackingOrder: false,

  placeOrder: async (data) => {
    set({ isPlacingOrder: true });
    try {
      const res = await axiosInstance.post("/orders", data);
      toast.success(res.data.message);
      set((state) => ({
        orders: [...state.orders, res.data.orderPlaced],
      }));
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isPlacingOrder: false });
    }
  },

  getUserOrders: async () => {
    set({ isFetchingOrders: true });
    try {
      const res = await axiosInstance.get("/orders");
      set({ orders: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingOrders: false });
    }
  },

  getSingleOrder: async (orderId) => {
    set({ isFetchingOrders: true });
    try {
      const res = await axiosInstance.get(`/orders/${orderId}`);
      set({ currentOrder: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isFetchingOrders: false });
    }
  },

  cancelOrder: async (orderId) => {
    set({ isUpdatingOrder: true });
    try {
      const res = await axiosInstance(`/orders/${orderId}/cancel`);
      toast.success(res.data.message);
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? res.data.updatedOrder : order
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingOrder: false });
    }
  },

  trackOrder: async (orderId) => {
    set({ isTrackingOrder: true });
    try {
      const res = await axiosInstance.get(`/orders/${orderId}/tracking`);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isTrackingOrder: false });
    }
  },
}));
