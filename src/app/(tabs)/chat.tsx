import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { Search } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/src/components/ui/avatar";
import { Text } from "~/src/components/ui/text";

const GITHUB_AVATAR_URI = "https://github.com/mrzachnugent.png";

const data = Array.from({ length: 20 }, (_, index) => ({
  name: `User ${index + 1}`,
  message: `This is a sample message from user ${index + 1}.`,
  time: `${(index % 12) + 1}:00 ${index < 12 ? "AM" : "PM"}`,
  avatarUrl: GITHUB_AVATAR_URI,
  isActive: index % 2 === 0,
}));

export default function ChatScreen() {
  return (
    <FlashList
      data={data}
      ListHeaderComponent={SearchBar}
      ListEmptyComponent={NotFound}
      renderItem={({ item }) => <ChatListItem {...item} />}
      keyExtractor={(item, index) => `chat-item-${index}`}
      estimatedItemSize={80}
    />
  );
}

export function ChatListItem({
  name,
  message,
  time,
  avatarUrl,
  isActive,
}: {
  name: string;
  message: string;
  time: string;
  avatarUrl: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href="/chat-inbox/[id]"
      className="flex-row items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 "
    >
      <View className="relative">
        <Avatar alt="Zach Nugent's Avatar" className="w-12 h-12">
          <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
          <AvatarFallback>
            <Text>ZN</Text>
          </AvatarFallback>
        </Avatar>
        {isActive && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-700" />
        )}
      </View>

      <View className="flex-1 ml-3">
        <Text className="text-base font-semibold">{name}</Text>
        <Text
          className="text-sm text-gray-500 dark:text-gray-500"
          numberOfLines={1}
        >
          {message}
        </Text>
      </View>

      <View className="ml-2 items-end">
        <Text className="text-xs text-gray-400 dark:text-gray-500">{time}</Text>
      </View>
    </Link>
  );
}
export const NotFound = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-semibold">Chat Not Found</Text>
      <Text className="text-gray-500">
        The chat you are looking for does not exist.
      </Text>
    </View>
  );
};
export const SearchBar = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <Text className="ml-2 text-3xl font-bold">Message</Text>
      <TouchableOpacity>
        <Search size={20} className="text-gray-400" />
      </TouchableOpacity>
    </View>
  );
};
