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
        tabBarActiveTintColor: "#7138ED",
        tabBarInactiveTintColor: "#ADADAD",
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
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="mail-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "Group",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="users" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
