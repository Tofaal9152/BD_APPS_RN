import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { fetcher } from "~/src/lib/Fetcher";

const PendingRequests = () => {
  type PickupPage = {
    requests: any[];
    pagination?: {
      hasNext: boolean;
      page: number;
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<PickupPage>({
    queryKey: ["pendingRequests"],
    queryFn: async ({ pageParam = 1 }) =>
      fetcher(`/api/all-pickup?page=${pageParam}&limit=10`),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PickupPage) => {
      if (lastPage.pagination?.hasNext) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });

  const flatData = data?.pages.flatMap((page) => page.requests) || [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-white rounded-md  ">
        <ActivityIndicator size="large" />
        <Text className="text-black  mt-2">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-white rounded-md  ">
        <Text className="text-red-500 dark:text-red-400">
          Error loading pending requests
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white rounded-md ">
      <Text className="text-xl font-bold mb-4 text-[#0F5329] ">
        Pending Requests
      </Text>

      <FlashList
        data={flatData}
        keyExtractor={(item) => item.id}
        estimatedItemSize={200}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 rounded-lg bg-gray-100 ">
            <Text className="font-semibold text-[#0F5329] ">Waste Type:</Text>
            <Text className="text-black ">{item.waste_type}</Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">
              Estimated Weight:
            </Text>
            <Text className="text-black ">{item.estimated_weight} kg</Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">
              Pickup Address:
            </Text>
            <Text className="text-black ">{item.pickup_location?.address}</Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">
              Preferred Time:
            </Text>
            <Text className="text-black ">
              {new Date(item.preferred_time).toLocaleString()}
            </Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">Notes:</Text>
            <Text className="text-black ">{item.notes}</Text>
          </View>
        )}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4 items-center">
              <ActivityIndicator />
              <Text className="text-gray-600 dark:text-gray-300 mt-2">
                Loading more...
              </Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-600 dark:text-gray-300">
            No pending requests found.
          </Text>
        }
      />
    </View>
  );
};

export default PendingRequests;
