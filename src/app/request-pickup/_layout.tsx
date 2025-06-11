import { Stack } from "expo-router";

export default function RequestPickupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Request For Pickup",
        headerTintColor: "#949D6A", 
      }}
    />
  );
}
