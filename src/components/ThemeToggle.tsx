import { Pressable, View } from "react-native";
import { setAndroidNavigationBar } from "~/src/lib/android-navigation-bar";
import { MoonStar } from "~/src/lib/icons/MoonStar";
import { Sun } from "~/src/lib/icons/Sun";
import { useColorScheme } from "~/src/lib/useColorScheme";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
    console.log(`Theme changed to: ${newTheme}`);
  }

  return (
    <Button className="bg-red-100" onPress={toggleColorScheme}>
      <View className="flex-1 aspect-square pt-0.5 justify-center items-start web:px-5">
        {isDarkColorScheme ? (
          <MoonStar className="text-foreground" size={23} strokeWidth={1.25} />
        ) : (
          <Sun className="text-foreground" size={24} strokeWidth={1.25} />
        )}
      </View>
    </Button>
  );
}
