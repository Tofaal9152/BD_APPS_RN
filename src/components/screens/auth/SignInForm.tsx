import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { useAuthStore } from "~/src/store/authStore";

const SignInForm = () => {
  const { login, isLoading } = useAuthStore();
  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
    showPassword: false,
    rememberMe: true,
  });

  const updateForm = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleLogin = async () => {
    const response = await login(form.emailOrPhone, form.password);
    console.log("Login response:", response);
    if (response.success) {
      Alert.alert("Success", response.message);
    } else {
      Alert.alert("Error", response.message);
    }
  };

  return (
    <View className="gap-3">
      <Input
        placeholder="Enter your email or phone number"
        value={form.emailOrPhone}
        onChangeText={(text) => updateForm("emailOrPhone", text)}
        autoCapitalize="none"
        className="text-sm dark:bg-white dark:border-gray-100 dark:text-black"
      />

      <View className="relative">
        <Input
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => updateForm("password", text)}
          secureTextEntry={!form.showPassword}
          className="text-sm dark:bg-white dark:border-gray-100 dark:text-black"
        />
        <TouchableOpacity
          onPress={() => updateForm("showPassword", !form.showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <Ionicons
            name={form.showPassword ? "eye-off" : "eye"}
            size={18}
            color="#0F5329"
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
            color="#0F5329"
          />
          <Text className="ml-1 text-xs text-[#0F5329]">Remember Me</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-xs text-[#0F5329] font-medium">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        disabled={isLoading}
        onPress={handleLogin}
        className="bg-[#949D6A] rounded-lg py-2 gap-2 flex-row items-center justify-center"
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
        <Text className="text-white text-sm">Log In</Text>
      </Button>
    </View>
  );
};

export default SignInForm;
