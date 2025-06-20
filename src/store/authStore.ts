import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create } from "zustand";
import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  id: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (phone: any, email: any, password: any) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          phone,
          email,
          password,
        }
      );

      console.log("Registration success:", response.data);

      return {
        success: true,
        message: "Registration successful",
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error?.response?.data?.error || "Registration failed",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (emailOrPhone: string, password: string) => {
    set({ isLoading: true });

    if (!emailOrPhone || !password) {
      return {
        success: false,
        message: "Email/phone and password are required.",
      };
    }

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          emailOrPhone,
          password,
        }
      );

      const token = response?.data?.token;
      const id = response?.data?.user?.id;
      const role = response?.data?.user?.currentRole;
      console.log("Login success:", response.data);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("id", id);
      await AsyncStorage.setItem("role", role);
      set({ token, id, role });
      return {
        success: true,
        message: "Login successful",
      };
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error?.response?.data?.error || "Invalid credentials",
      };
    } finally {
      set({ isLoading: false });
    }
  },

 isAuthenticated: async () => {
  set({ isCheckingAuth: true });
  try {
    const [token, id, role] = await Promise.all([
      AsyncStorage.getItem("token"),
      AsyncStorage.getItem("id"),
      AsyncStorage.getItem("role"),
    ]);
    set({ token, id, role, isCheckingAuth: false });
  } catch (error) {
    console.error("Auth check failed:", error);
    set({ isCheckingAuth: false });
  }
},

  // isAuthenticated: async () => {
  //   set({ isCheckingAuth: true });
  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     set({ token, isCheckingAuth: false });
  //   } catch (error) {
  //     console.error("Auth check failed:", error);
  //     set({ isCheckingAuth: false });
  //   }
  // },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AsyncStorage.removeItem("token");
      set({ token: null });
      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        message: "Logout failed",
      };
    } finally {
      set({ isLoading: false });
    }
  },

  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },
}));
