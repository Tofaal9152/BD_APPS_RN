import React from "react";
import { View } from "react-native";
import { Text } from "~/src/components/ui/text";
import { useAuthStore } from "~/src/store/authStore";

export default function index() {
  const { token, logout } = useAuthStore();

  return (
    <View>
      <Text>{token}</Text>
    </View>
  );
}
