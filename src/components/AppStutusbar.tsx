import { Platform, StatusBar } from "react-native";
export default function AppStatusBar({
  isDarkColorScheme,
}: {
  isDarkColorScheme: boolean;
}) {
  return (
    <StatusBar
      barStyle={isDarkColorScheme ? "light-content" : "dark-content"}
      backgroundColor={
        isDarkColorScheme
          ? NAV_THEME.dark.background
          : NAV_THEME.light.background
      }
      translucent={Platform.OS === "android"}
      animated
    />
  );
}
const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};
