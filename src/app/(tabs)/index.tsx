import { View, Alert } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useAuthStore } from "~/src/store/authStore";
import { Button } from "~/src/components/ui/button";
import { Text } from "~/src/components/ui/text";

export default function index() {
  const { token, logout } = useAuthStore();

  const confirmLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => logout(),
      },
    ]);
  };
  return (
    <View>
      <Text>{token}</Text>
      <Link href="/(auth)/login">
        <Text>Go to Login</Text>
      </Link>

      <Button onPress={confirmLogout} variant={"destructive"} className="mt-8">
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
