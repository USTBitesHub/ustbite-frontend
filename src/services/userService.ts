import { apiClient } from "./apiClient";
import type { User } from "@/types";

export const userService = {
  me: async () => {
    const res = await apiClient.get<User>("/users/me");
    return res.data;
  },

  update: async (patch: Partial<User>) => {
    const res = await apiClient.put<User>("/users/me", patch);
    return res.data;
  },
};
