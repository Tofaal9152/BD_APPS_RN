// src/providers/RootThemeProvider.tsx
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import { NAV_THEME } from "../lib/constants";
import { useColorScheme } from "../lib/useColorScheme";
import { StatusBar, Platform } from "react-native";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export default function RootThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkColorScheme } = useColorScheme();

  const backgroundColor = isDarkColorScheme
    ? NAV_THEME.dark.background
    : NAV_THEME.light.background;

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar
        barStyle={isDarkColorScheme ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
        translucent={Platform.OS === "android"}
        animated
      />
      {children}
    </ThemeProvider>
  );
}
