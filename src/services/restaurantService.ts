import { apiClient } from "./apiClient";
import type { Restaurant, MenuItem } from "@/types";

export const restaurantService = {
  list: async () => {
    const res = await apiClient.get<Restaurant[]>("/restaurants");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await apiClient.get<Restaurant>(`/restaurants/${id}`);
    return res.data;
  },

  getMenu: async (id: string) => {
    const res = await apiClient.get<MenuItem[]>(`/restaurants/${id}/menu`);
    return res.data;
  },
};
