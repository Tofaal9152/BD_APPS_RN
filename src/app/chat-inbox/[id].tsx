import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ChatMessage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>ChatMessage {id}</Text>
    </View>
  );
};

export default ChatMessage;
