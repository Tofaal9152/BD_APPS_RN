import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function TabsLayout() {
  const insects = useSafeAreaInsets();
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
          backgroundColor: "#fff",
          borderTopWidth: 0,
          // borderTopColor: "#0F5329B2",
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
