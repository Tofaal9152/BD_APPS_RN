import { Tabs, Redirect } from "expo-router";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "~/src/lib/useColorScheme";
export default function TabsLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const insects = useSafeAreaInsets();
  console.log("insects", insects);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0F5329",
        tabBarInactiveTintColor: "#0F5329B2",
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: `${isDarkColorScheme ? "#000" : "#fff"}`,
          borderTopWidth: 0.7,
          borderTopColor: `${isDarkColorScheme ? "#333" : "#ccc"}`,

          paddingTop: 5,
          paddingBottom: insects.bottom,
          height: 60 + insects.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="heatmap"
        options={{
          title: "Heatmap",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="map" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="store" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaders",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="trophy" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
