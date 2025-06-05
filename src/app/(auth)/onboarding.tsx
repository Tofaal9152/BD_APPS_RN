import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "~/src/components/ui/button";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View className="flex-1 px-6 bg-white dark:bg-gray-950">
      {/* Logo & Title */}
      <View className="items-center mb-4 mt-16">
        <Image
          source={require("~/public/auth/logo.png")}
          style={{ width: 36, height: 36 }}
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold mt-4 text-white dark:text-white">
          Join Up&Pro
        </Text>
      </View>

      {/* Buttons */}
      <Button
        onPress={() => router.push("/student-signup")}
        className="bg-[#7138ED] rounded-xl p-4 mb-4"
      >
       <Text className="text-white">As a Student</Text>
      </Button>

      <Button
        onPress={() => router.push("/ambassador-signup")}
        className="bg-[#7138ED] rounded-xl p-4 mb-4"
      >
        <Text className="text-white">As an Ambassador</Text>
      </Button>

      {/* Already have an account? */}
      <View className="mt-2 flex-row justify-center">
        <Text className="text-black dark:text-gray-300">
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-[#7138ED] font-semibold ">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
