import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const HouseholdScreen = () => {
  const scrapItems = [
    { label: "PLASTIC", image: require("~/public/sell_scrapes/plastic.png") },
    { label: "PAPER", image: require("~/public/sell_scrapes/paper.png") },
    { label: "E-TRASH", image: require("~/public/sell_scrapes/e-trash.png") },
    { label: "ORGANIC", image: require("~/public/sell_scrapes/organic.png") },
  ];

  return (
    <View>
      <Text className="text-lg font-bold mb-3 text-[#0F5329]">Sell Scraps</Text>
      <View className="flex-row justify-between mb-6">
        {scrapItems.map((item, idx) => (
          <View key={idx} className="items-center">
            <TouchableOpacity className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden mb-2">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text className="text-xs">{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Current Deals Section */}
      <Text className="text-lg font-bold mb-3 text-[#0F5329]">
        Current Deals
      </Text>
      <View className="flex-row flex-wrap  justify-between my-4  gap-2">
        {["PLASTIC", "PAPER", "E-TRASH", "ORGANIC"].map((deal, index) => (
          <View
            key={index}
            className="bg-[#E0E0D5] h-[6rem] rounded-lg shadow-md flex-1 items-center justify-center "
          >
            <Text className="text-[#0F5329]">{deal}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity className="bg-[#C0CC8A] p-3 mt-8 rounded-lg shadow-md items-center justify-center">
        <Text className="text-white">SHOW MORE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HouseholdScreen;
