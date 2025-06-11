import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Text, View } from "react-native";

const data = [
  { name: "Ayesha Rahman", points: 980, location: "Dhaka" },
  { name: "Tanvir Hossain", points: 950, location: "Chittagong" },
  { name: "Nadia Karim", points: 920, location: "Khulna" },
  { name: "Imran Chowdhury", points: 910, location: "Rajshahi" },
  { name: "Farhana Jahan", points: 900, location: "Sylhet" },
  { name: "Zubair Ahmed", points: 890, location: "Barisal" },
  { name: "Maliha Islam", points: 875, location: "Dhaka" },
  { name: "Rafiq Mia", points: 860, location: "Chittagong" },
  { name: "Sadia Nowshin", points: 855, location: "Rangpur" },
  { name: "Tariq Aziz", points: 845, location: "Comilla" },
  { name: "Anika Tasnim", points: 840, location: "Mymensingh" },
  { name: "Rezaul Karim", points: 830, location: "Sylhet" },
  { name: "Mahinur Akter", points: 820, location: "Jessore" },
  { name: "Nasir Uddin", points: 810, location: "Dhaka" },
  { name: "Tahmina Haque", points: 800, location: "Chittagong" },
  { name: "Khalid Hasan", points: 790, location: "Khulna" },
  { name: "Lamia Akhter", points: 780, location: "Dhaka" },
  { name: "Hossain Ali", points: 770, location: "Rajshahi" },
  { name: "Jannat Zerin", points: 760, location: "Barisal" },
  { name: "Salman Khan", points: 750, location: "Sylhet" },
  { name: "Tania Ferdous", points: 740, location: "Gazipur" },
  { name: "Asif Mahmud", points: 730, location: "Narayanganj" },
];

export default function Leaderboard() {
  return (
    <View className="flex-1 bg-[#F9F9F9] px-4 py-6">
      <Text className="text-3xl font-bold text-center mb-6 text-[#0F5329]">
        🏆 Leaderboard
      </Text>

      <View className="bg-white rounded-xl shadow p-3 mb-2 flex-row justify-between items-center">
        <Text className="w-1/6 font-bold text-gray-500">#</Text>
        <Text className="w-2/6 font-bold text-gray-500">Name</Text>
        <Text className="w-1/4 font-bold text-gray-500 text-right">Points</Text>
        <Text className="w-1/4 font-bold text-gray-500 text-right">Location</Text>
      </View>

      <FlashList
        data={data}
        estimatedItemSize={60}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            className={`bg-white rounded-xl px-3 py-4 mb-2 flex-row items-center justify-between ${
              index < 3 ? "border-l-4 border-[#0F5329]" : ""
            }`}
          >
            <Text className="w-1/6 font-semibold text-lg text-gray-700">
              {index + 1}
            </Text>
            <Text className="w-2/6 font-medium text-gray-800">
              {item.name}
            </Text>
            <Text className="w-1/4 text-right text-gray-700">
              {item.points}
            </Text>
            <Text className="w-1/4 text-right text-gray-500">
              {item.location}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
