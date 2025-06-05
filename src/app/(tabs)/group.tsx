import { View, Text, ActivityIndicator, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetcher } from "~/src/lib/api2";
import { useState } from "react";

const PAGE_SIZE = 4;

export default function GroupScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["jsonPlaceholder"],

    queryFn: ({ pageParam = 1 }) =>
      fetcher(`/posts?_limit=${PAGE_SIZE}&_page=${pageParam}`),

    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,

    initialPageParam: 1,
  });

  const flatData = data?.pages.flat() ?? [];

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={flatData}
      renderItem={({ item }: any) => (
        <View
          style={{
            padding: 16,
            borderBottomWidth: 0.5,
            borderColor: "#ccc",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        isFetchingNextPage ? (
          <View style={{ padding: 20 }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}
// import { View, Text, ActivityIndicator, RefreshControl } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { fetcher } from "~/src/lib/api2";
// import { useState } from "react";

// const PAGE_SIZE = 4;

// export default function GroupScreen() {
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useInfiniteQuery({
//     queryKey: ["jsonPlaceholder"],

//     queryFn: ({ pageParam = 1 }) =>
//       fetcher(`/posts?_limit=${PAGE_SIZE}&_page=${pageParam}`),

//     getNextPageParam: (lastPage, allPages) =>
//       lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,

//     initialPageParam: 1,
//   });

//   const flatData = data?.pages.flat() ?? [];

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//   };

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Error: {error?.message}</Text>
//       </View>
//     );
//   }

//   return (
//     <FlashList
//       data={flatData}
//       renderItem={({ item }: any) => (
//         <View
//           style={{
//             padding: 16,
//             borderBottomWidth: 0.5,
//             borderColor: "#ccc",
//           }}
//         >
//           <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
//           <Text>{item.body}</Text>
//         </View>
//       )}
//       estimatedItemSize={100}
//       keyExtractor={(item) => item.id.toString()}
//       showsVerticalScrollIndicator={false}
//       ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
//       onEndReached={() => {
//         if (hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       }}
//       onEndReachedThreshold={0.5}
//       ListFooterComponent={() =>
//         isFetchingNextPage ? (
//           <View style={{ padding: 20 }}>
//             <ActivityIndicator />
//           </View>
//         ) : null
//       }
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//       }
//     />
//   );
// }
