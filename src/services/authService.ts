import { apiClient } from "./apiClient";
import type { AuthCredentials, RegisterPayload, User } from "@/types";

export const authService = {
  login: async (credentials: AuthCredentials) => {
    const res = await apiClient.post<User>("/auth/login", credentials);
    return res.data;
  },

  register: async (payload: RegisterPayload) => {
    const res = await apiClient.post<User>("/auth/register", payload);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
