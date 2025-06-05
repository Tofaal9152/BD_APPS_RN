import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StudentForm from "~/src/components/screens/auth/StudentForm";
export default function StudentSignupScreen() {
  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      {/* Logo and Title */}
      <View className="items-center mb-10 mt-16">
        <Image
          source={require("~/public/auth/logo.png")}
          alt="Logo"
          style={{ width: 36, height: 36 }}
          contentFit="contain"
        />
        <Text className="text-3xl font-bold mt-4 text-black dark:text-white">
          Student Registration
        </Text>
      </View>

      <StudentForm />

      <View className="flex-row items-center justify-center my-4">
        <View className="flex-1 border-t border-gray-300" />
        <Text className="mx-4 text-gray-500">OR</Text>
        <View className="flex-1 border-t border-gray-300" />
      </View>

      {/* Login Link */}
      <View className="flex-row justify-center">
        <Text className="text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-[#7138ED] font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
