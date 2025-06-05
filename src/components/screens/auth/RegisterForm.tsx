import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { useAuthStore } from "~/src/store/authStore";

const RegisterForm = () => {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [form, setForm] = useState({
    phone: "",
    email: "",
    password: "",
    showPassword: false,
    rememberMe: true,
  });

  const updateForm = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleRegister = async () => {
    const response = await register(form.phone, form.email, form.password);
    console.log("Registration response:", response);
    if (response.success) {
      Alert.alert("Success", response.message);
      router.push("/(auth)/login");
    } else {
      Alert.alert("Error", response.message);
    }
  };

  return (
    <View className="gap-3">
      <Input
        placeholder="Enter your email "
        value={form.email}
        onChangeText={(text) => updateForm("email", text)}
        keyboardType="email-address"
        className="text-sm"
        placeholderTextColor=""
      />
      <Input
        placeholder="Enter your Phone Number"
        value={form.phone}
        onChangeText={(text) => updateForm("phone", text)}
        keyboardType="phone-pad"
        className="text-sm"
        placeholderTextColor=""
      />

      <View className="relative">
        <Input
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => updateForm("password", text)}
          secureTextEntry={!form.showPassword}
          className="text-sm"
          placeholderTextColor=""
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

      <Button
        disabled={isLoading}
        onPress={handleRegister}
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
        <Text className="text-white text-sm">Sign Up</Text>
      </Button>
    </View>
  );
};

export default RegisterForm;
