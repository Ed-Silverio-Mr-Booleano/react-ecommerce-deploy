// src/stores/authStore.ts
import { create } from "zustand";

const STORAGE_USER_KEY = "user";

interface User {
  id: number;
  email: string;
  username: string;
  tipo: "USER" | "ADMIN";
}

interface AuthState {
  user: User | null;
  splashLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  loadStorageData: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem(STORAGE_USER_KEY) || "null"),
  splashLoading: true,
  isAuthenticated: !!localStorage.getItem(STORAGE_USER_KEY),

  loadStorageData: () => {
    const storageUserData = localStorage.getItem(STORAGE_USER_KEY);
    if (storageUserData) {
      const parsedUser = JSON.parse(storageUserData);
      set({
        user: parsedUser,
        isAuthenticated: true,
        splashLoading: false,
      });
    } else {
      set({ splashLoading: false });
    }
  },

  login: (userData) => {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    set({ user: null, isAuthenticated: false });
  },
}));
