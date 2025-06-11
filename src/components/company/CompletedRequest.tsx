import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { fetcher } from "~/src/lib/Fetcher";

const CompletedRequest = ({ id }: any) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["completedRequests"],
    queryFn: () =>
      fetcher(`/api/pickup-requests?status=delivered&company_id=${id}`),
  });
  console.log("Data:", data);
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
      <View className="flex-1 justify-center items-center bg-white p-4 rounded-md ">
        <Text className="text-red-500 dark:text-red-400">
          Error fetching data
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white  p-4 rounded-md">
      <Text className="text-xl font-bold mb-4 text-[#0F5329] ">
        Completed Requests
      </Text>

      <FlashList
        data={data}
        keyExtractor={(item: any) => item.id}
        estimatedItemSize={200}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 rounded-lg bg-gray-100 ">
            <Text className="font-semibold text-[#0F5329] ">Waste Type:</Text>
            <Text className="text-black ">{item.waste_type}</Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">
              Actual Weight:
            </Text>
            <Text className="text-black ">{item.actual_weight} kg</Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">
              Pickup Address:
            </Text>
            <Text className="text-black ">{item.pickup_location?.address}</Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">
              Delivered At:
            </Text>
            <Text className="text-black ">
              {new Date(item.delivered_at).toLocaleString()}
            </Text>

            <Text className="font-semibold text-[#0F5329]  mt-2">Notes:</Text>
            <Text className="text-black ">{item.notes}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-gray-600 dark:text-gray-400">
            No completed requests found.
          </Text>
        }
      />
    </View>
  );
};

export default CompletedRequest;
