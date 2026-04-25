import { apiClient } from "./apiClient";
import type { Restaurant, MenuItem, ApiResponse } from "@/types";

export const restaurantService = {
  list: async (): Promise<Restaurant[]> => {
    const res = await apiClient.get<ApiResponse<Restaurant[]>>("/restaurants");
    return res.data.data;
  },

  getById: async (id: string): Promise<Restaurant> => {
    const res = await apiClient.get<ApiResponse<Restaurant>>(`/restaurants/${id}`);
    return res.data.data;
  },

  getMenu: async (id: string): Promise<MenuItem[]> => {
    const res = await apiClient.get<ApiResponse<MenuItem[]>>(`/restaurants/${id}/menu`);
    return res.data.data;
  },
};
