import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthenticationStore } from "./useAuthenticationStore";

export const useUserStore = create((set) => ({
  userProfile: null,
  isGettingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false,

  getUserProfile: async () => {
    set({ isGettingUser: true });
    try {
      const res = await axiosInstance.get("/user");
      set({ userProfile: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingUser: false });
    }
  },

  addUserAddress: async (data) => {
    set({ isUpdatingUser: true });
    try {
      const res = await axiosInstance.post("/user/address", data);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isUpdatingUser: false });
    }
  },

  updateUserAddress: async (data, addressId) => {
    set({ isUpdatingUser: true });
    try {
      const res = await axiosInstance.put(`/user/address/${addressId}`, data);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isUpdatingUser: false });
    }
  },

  becomeASeller: async () => {
    set({ isUpdatingUser: true });
    try {
      await axiosInstance.put("/user/become-a-seller");
      toast.success(
        "Congratulations, you are officially a seller at GeekStore"
      );
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isUpdatingUser: false });
    }
  },

  deleteUser: async () => {
    set({ isDeletingUser: true });
    try {
      await axiosInstance.delete("/user/");
      toast.success("Account deleted successfully");
      useAuthenticationStore.getState().logout();
    } catch (error) {
      toast.error(error.data.response.message);
    } finally {
      set({ isUpdatingUser: false });
    }
  },
}));
