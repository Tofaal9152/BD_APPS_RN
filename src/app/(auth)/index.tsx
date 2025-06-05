import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignInForm from "~/src/components/screens/auth/SignInForm";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center mb-10 mt-16">
        <Image
          source={require("~/public/auth/logo.png")}
          style={{ width: 36, height: 36 }}
          contentFit="contain"
        />
        <Text className="text-3xl font-bold mt-4 text-black dark:text-white">
          Welcome to Up&Pro
        </Text>
      </View>
      {/* SignIn form */}
      <SignInForm />

      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-700 dark:text-gray-300">
          Don&apos;t have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/onboarding")}>
          <Text className="text-[#7138ED] font-semibold">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Text className="text-[#7138ED] font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
