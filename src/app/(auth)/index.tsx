import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "~/src/components/ui/button";

export default function index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-between ">
      {/* Centered Round Icon */}
     
        <View className="bg-[#C0CC8A]  rounded-full shadow-lg p-6 flex items-center justify-center mt-40">
          <Image
            source={require("~/public/compost-it-logo.png")}
            className="w-24 h-24"
          />
        </View>


      {/* Bottom Buttons */}
      <View className="mb-20">
        <Button
          className="bg-[#C0CC8A] "
          onPress={() => router.push("/(auth)/register")}
        >
          <Text className="text-white">Get Started</Text>
        </Button>
        <Text className="text-center text-[#0F5329] text-base mt-4">
          Already have an account?
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className=""
          >
            <Text className="font-bold text-[#0F5329] ">Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
