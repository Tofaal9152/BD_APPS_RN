import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import "~/global.css";
import { AppProviders } from "~/src/providers/AppProviders";
import { AuthRedirect } from "~/src/providers/AuthRedirect";
import { usePlatformSetup } from "../providers/usePlatformSetup";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  usePlatformSetup();

  useEffect(() => {
    const check = async () => {
      isAuthenticated();
      setAuthChecked(true);
    };
    check();
  }, []);

  if (isCheckingAuth || !authChecked) {
    return (
      <AppProviders>
        <ActivityIndicator
          size="large"
          color="#7138ED"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      </AppProviders>
    );
  }

  return (
    <AppProviders>
      <AuthRedirect />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AppProviders>
  );
}

export { ErrorBoundary } from "expo-router";
