import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "~/src/components/ui/button";
import { fetcher } from "~/src/lib/Fetcher";
import { useAuthStore } from "~/src/store/authStore";

const Profile = () => {
  const { logout } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Profile"],
    queryFn: () => fetcher("/api/auth/profile"),
  });

  const user = data?.user;

  //   logout function
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

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white ">
        <ActivityIndicator size="large" color="#0F5329" />
        <Text className="mt-4 text-[#0F5329] ">Loading...</Text>
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View className="flex-1 items-center justify-center bg-white  px-6">
        <Text className="text-red-600 dark:text-red-400 text-lg font-semibold">
          Failed to load profile.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white  px-6 py-10">
      {/* Avatar + Name Section */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-[#C0CC8A] items-center justify-center">
          <FontAwesome5 name="user" size={40} color="#fff" />
        </View>
        <Text className="mt-4 text-xl font-semibold text-[#0F5329] ">
          {user.email}
        </Text>
        <Text className="text-gray-500 text-sm">{user.userType}</Text>
      </View>

      {/* User Info */}
      <View className="space-y-3 ">
        <InfoRow label="Phone" value={user.phone} />
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Role" value={user.currentRole} />
        <InfoRow
          label="Verified"
          value={user.isVerified ? "Yes" : "No"}
          icon={user.isVerified ? "checkmark-circle" : "close-circle"}
          iconColor={user.isVerified ? "#4CAF50" : "#F44336"}
        />
        <InfoRow
          label="Member Since"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
      </View>

      {/* Bottom Settings */}
      <View className="mt-10  border-gray-200 dark:border-gray-700 pt-6 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-[#0F5329]  font-medium">Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
            trackColor={{ false: "#ccc", true: "#949D6A" }}
            thumbColor={darkMode ? "#0F5329" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity className="flex-row items-center gap-2">
          <Ionicons name="settings-outline" size={20} color="#0F5329" />
          <Text className="text-[#0F5329]  font-medium">Settings</Text>
        </TouchableOpacity>
        {/* Edit Profile */}
        {/* <EditProfile user={user} /> */}
        {/* Logout */}
        <Button
          onPress={confirmLogout}
          className="mt-4 bg-[#C0CC8A] px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Logout</Text>
        </Button>
      </View>
    </View>
  );
};

const InfoRow = ({
  label,
  value,
  icon,
  iconColor,
}: {
  label: string;
  value: string;
  icon?: any;
  iconColor?: string;
}) => (
  <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-800 py-3">
    <Text className="text-[#0F5329]">{label}</Text>
    <View className="flex-row items-center gap-2">
      {icon && <Ionicons name={icon} size={16} color={iconColor || "#555"} />}
      <Text className="font-medium text-[#0F5329] ">{value}</Text>
    </View>
  </View>
);

export default Profile;
