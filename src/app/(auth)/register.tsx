import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "~/src/components/screens/auth/RegisterForm";

export default function RegisterScreen() {
  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <View className="items-center mb-10 mt-16">
        <Text className="text-3xl font-bold mt-4 text-[#0F5329] ">Sign Up</Text>
        <Text className="text-center text-[#0F5329] text-base mb-4">
          Start your eco journey today!
        </Text>
      </View>
      {/* register form */}
      <RegisterForm />
      <View className="mt-6 flex-row justify-center">
        <Text className="text-[#0F5329]">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-[#0F5329] font-semibold">Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
