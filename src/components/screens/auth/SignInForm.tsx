import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { useAuthStore } from "~/src/store/authStore";

const SignInForm = () => {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: true,
  });

  const updateForm = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleLogin = async () => {
    const response = await login(form.email, form.password);
    if (response.success) {
      Alert.alert("Success", response.message);
    } else {
      Alert.alert("Error", response.message);
    }
  };

  return (
    <View className="gap-3">
      <Input
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => updateForm("email", text)}
        keyboardType="email-address"
        className="text-sm"
        placeholderTextColor="#6B7280"
      />

      <View className="relative">
        <Input
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => updateForm("password", text)}
          secureTextEntry={!form.showPassword}
          className="text-sm"
          placeholderTextColor="#6B7280"
        />
        <TouchableOpacity
          onPress={() => updateForm("showPassword", !form.showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Ionicons
            name={form.showPassword ? "eye-off" : "eye"}
            size={18}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => updateForm("rememberMe", !form.rememberMe)}
          className="flex-row items-center"
        >
          <FontAwesome
            name={form.rememberMe ? "toggle-on" : "toggle-off"}
            size={20}
            color="#7138ED"
          />
          <Text className="ml-1 text-xs text-gray-700 dark:text-gray-300">
            Remember Me
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text className="text-xs text-[#7138ED] font-medium">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        disabled={isLoading}
        onPress={handleLogin}
        className="bg-[#7138ED] rounded-lg py-2 gap-2 flex-row items-center justify-center"
      >
        {isLoading && (
          <View>
            <FontAwesome
              name="spinner"
              size={16}
              color="#fff"
              className="animate-spin"
            />
          </View>
        )}
        <Text className="text-white text-sm">Sign In</Text>
      </Button>
    </View>
  );
};

export default SignInForm;
