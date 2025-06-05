import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "../store/authStore";

export function AuthRedirect() {
  const { token } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    const isLoggedIn = !!token;

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [token, segments]);

  return null;
}
