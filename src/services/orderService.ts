import { apiClient } from "./apiClient";
import type { Order, PlaceOrderPayload, ApiResponse } from "@/types";

export const orderService = {
  place: async (payload: PlaceOrderPayload): Promise<Order> => {
    const res = await apiClient.post<ApiResponse<Order>>("/orders", payload);
    return res.data.data;
  },

  getById: async (id: string): Promise<Order> => {
    const res = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return res.data.data;
  },

  track: async (id: string): Promise<Order | undefined> => {
    const res = await apiClient.get<ApiResponse<Order>>(`/orders/${id}/track`);
    return res.data.data;
  },

  myOrders: async (): Promise<Order[]> => {
    const res = await apiClient.get<ApiResponse<Order[]>>("/orders/me");
    return res.data.data;
  },
};
