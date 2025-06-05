import { QueryProvider } from "./QueryProvider";
import { PortalHost } from "@rn-primitives/portal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../providers/SafeScreen";
import RootThemeProvider from "./RootThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <RootThemeProvider>
        <SafeAreaProvider>
          <SafeScreen>{children}</SafeScreen>
          <PortalHost />
        </SafeAreaProvider>
      </RootThemeProvider>
    </QueryProvider>
  );
}
