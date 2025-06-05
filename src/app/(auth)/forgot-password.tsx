import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ForgotPassword() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <Text>Forgot Password</Text>
    </KeyboardAwareScrollView>
  );
}
