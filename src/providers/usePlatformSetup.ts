import { useLayoutEffect, useEffect } from "react";
import { Platform, Appearance } from "react-native";
import { setAndroidNavigationBar } from "../lib/android-navigation-bar";

export function usePlatformSetup() {
  const isWeb = Platform.OS === "web";
  const isAndroid = Platform.OS === "android";

  const useIsomorphicLayoutEffect =
    isWeb && typeof window === "undefined" ? useEffect : useLayoutEffect;

  useIsomorphicLayoutEffect(() => {
    if (isWeb) {
      document.documentElement.classList.add("bg-background");
    }
  }, []);

  useLayoutEffect(() => {
    if (isAndroid) {
      setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
    }
  }, []);
}
