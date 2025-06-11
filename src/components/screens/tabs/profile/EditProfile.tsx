import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "~/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/src/components/ui/dialog";
import { Text } from "~/src/components/ui/text";
import api from "~/src/lib/api";

const EditProfile = ({ user }: any) => {
  const queryClient = useQueryClient();

  const [id, setId] = useState(user?.id || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState(user?.password || "");
  const [userType, setUserType] = useState(user?.userType || "user");

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
    },
    onError: (err: any) => {
      console.error("Update failed:", err?.response?.data?.message || err);
    },
  });

  const handleSave = () => {
    mutation.mutate({
      id,
      email,
      phone,
      password,
      userType,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TouchableOpacity className="flex-row items-center gap-2 mt-4">
          <Ionicons name="person-outline" size={20} color="#F44336" />
          <Text className="text-[#F44336] font-medium dark:text-red-400">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* Input fields */}
        <View className="gap-4">
          <TextInput
            value={id}
            onChangeText={setId}
            placeholder="ID"
            className="border border-gray-300 rounded hidden px-3 py-2 dark:text-white dark:border-gray-600"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2 dark:text-white dark:border-gray-600"
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            keyboardType="phone-pad"
            className="border border-gray-300 rounded px-3 py-2 dark:text-white dark:border-gray-600"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="New Password (optional)"
            secureTextEntry
            className="border border-gray-300 rounded px-3 py-2 dark:text-white dark:border-gray-600"
          />
          <TextInput
            value={userType}
            onChangeText={setUserType}
            placeholder="User Type"
            className="border border-gray-300 rounded px-3 py-2 dark:text-white dark:border-gray-600"
          />
        </View>

        <DialogFooter>
          <DialogClose asChild>
            <Button onPress={handleSave} disabled={mutation.isPending}>
              <Text>{mutation.isPending ? "Saving..." : "Save"}</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
// ~/src/services/profile.ts

const updateProfile = async (data: {
  id?: string;
  email?: string;
  phone?: string;
  password?: string;
  userType?: string;
}) => {
  const response = await api.put("/api/auth/update-profile", data);
  console.log("Update response:", response.data);
  return response.data;
};
