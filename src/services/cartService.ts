import { apiClient } from "./apiClient";
import type { CartItem } from "@/types";

export const cartService = {
  get: async () => {
    const res = await apiClient.get<CartItem[]>("/cart");
    return res.data;
  },

  sync: async (items: CartItem[]) => {
    const res = await apiClient.put<{ ok: true }>("/cart", { items });
    return res.data;
  },
};
