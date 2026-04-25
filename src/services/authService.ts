import { apiClient } from "./apiClient";
import type { User } from "@/types";

interface AuthCredentials {
  email: string;
  employee_id: string;
}

interface RegisterPayload {
  email: string;
  employee_id: string;
  name: string;
  phone?: string;
  department?: string;
  floor_number?: string;
}

interface AuthResponse {
  data: { token: string; user: User };
  message: string;
  status: string;
}

function setAuthCookie(token: string) {
  // Store JWT in a cookie — read by apiClient interceptor
  document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
}

function clearAuthCookie() {
  document.cookie = "auth_token=; path=/; max-age=0";
}

export const authService = {
  login: async (credentials: AuthCredentials): Promise<User> => {
    const res = await apiClient.post<AuthResponse>("/auth/login", credentials);
    const { token, user } = res.data.data;
    setAuthCookie(token);
    return user;
  },

  register: async (payload: RegisterPayload): Promise<User> => {
    const res = await apiClient.post<AuthResponse>("/auth/register", payload);
    const { token, user } = res.data.data;
    setAuthCookie(token);
    return user;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout").catch(() => {}); // best-effort
    clearAuthCookie();
  },

  isAuthenticated: (): boolean => {
    return document.cookie.includes("auth_token=");
  },
};
