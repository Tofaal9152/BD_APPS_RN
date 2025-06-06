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
        <Text className="text-3xl font-bold mt-4 text-[#0F5329] ">
          Welcome Back!
        </Text>
      </View>
      {/* SignIn form */}
      <SignInForm />

      <View className="mt-6 flex-row justify-center">
        <Text className="text-[#0F5329]">Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text className="text-[#0F5329] font-semibold">Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
