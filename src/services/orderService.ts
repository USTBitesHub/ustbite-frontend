import { apiClient } from "./apiClient";
import type { Order, PlaceOrderPayload } from "@/types";

export const orderService = {
  place: async (payload: PlaceOrderPayload, restaurantName: string): Promise<Order> => {
    const res = await apiClient.post<Order>("/orders", payload);
    return res.data;
  },

  getById: async (id: string) => {
    const res = await apiClient.get<Order>(`/orders/${id}`);
    return res.data;
  },

  track: async (id: string): Promise<Order | undefined> => {
    const res = await apiClient.get<Order>(`/orders/${id}/track`);
    return res.data;
  },

  myOrders: async () => {
    const res = await apiClient.get<Order[]>("/orders/me");
    return res.data;
  },
};
