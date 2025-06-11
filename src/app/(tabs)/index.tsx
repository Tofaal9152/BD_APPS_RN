import * as Location from "expo-location";
import { Link } from "expo-router";
import { UserCircle2Icon } from "lucide-react-native";
import { default as React, useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "~/src/components/ui/text";
import { useAuthStore } from "~/src/store/authStore";
const scrapItems = [
  { label: "PLASTIC", image: require("~/public/sell_scrapes/plastic.png") },
  { label: "PAPER", image: require("~/public/sell_scrapes/paper.png") },
  { label: "E-TRASH", image: require("~/public/sell_scrapes/e-trash.png") },
  { label: "ORGANIC", image: require("~/public/sell_scrapes/organic.png") },
];

export default function HomePage() {
  const {logout} = useAuthStore()
  
  const [location, setLocation] = useState<string>("Loading...");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (geo.length > 0) {
        const place = geo[0];
        const fullAddress = [
          place.name, // Street or building
          place.street, // Street name
          place.postalCode, // Zip
          place.city || place.region, // City/Region
          place.district, // District
          place.country, // Country
        ]
          .filter(Boolean)
          .join(", ");

        const latLong = `Lat: ${loc.coords.latitude.toFixed(
          4
        )}, Lon: ${loc.coords.longitude.toFixed(4)}`;

        setLocation(`${fullAddress}\n${latLong}`);
      } else {
        setLocation("Location not found");
      }
    })();
  }, []);

  console.log(location);
  return (
    <ScrollView
      style={{ padding: 20 }}
      contentContainerStyle={{ paddingBottom: 50 }}
      className="bg-[#F4F4F4]"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-10">
        <View>
          <Text className="text-2xl font-bold text-[#0F5329]">
            Welcome user!
          </Text>
          <View className="w-[69px] h-[2px] flex-shrink-0 rounded-[1px] bg-[#0F5329]" />
        </View>
        <View className="flex-row items-center gap-2 border-2 border-[#0F5329] rounded-lg p-2">
          <UserCircle2Icon color="#0F5329" size={16} />
          <Text className="text-[#0F5329]">360D</Text>
        </View>
      </View>

      {/* Location Card */}
      <View className="bg-white p-5 rounded-2xl mb-6 shadow-md">
        <Text className="text-base font-bold text-[#0F5329] mb-2">
          Current Location
        </Text>

        <View className="bg-[#F4F4F4] p-3 rounded-lg mb-4">
          {(() => {
            // Split location into address and lat/long
            const [address = "", latLong = ""] = location.split("\n");
            // Try to split address into parts
            const addressParts = address.split(",").map((part) => part.trim());
            const labels = [
              "Place",
              "Street",
              "Postal Code",
              "City/Region",
              "District",
              "Country",
            ];

            return (
              <>
                {address === "Loading..." ||
                address === "Permission denied" ||
                address === "Location not found" ? (
                  <Text className="text-sm font-semibold text-[#0F5329]">
                    {address}
                  </Text>
                ) : (
                  <>
                    {addressParts.map((part, i) =>
                      part ? (
                        <View key={i} className="flex-row mb-1">
                          <Text className="text-xs font-semibold text-[#0F5329] w-24">
                            {labels[i]}:
                          </Text>
                          <Text className="text-xs text-gray-800 flex-1">
                            {part}
                          </Text>
                        </View>
                      ) : null
                    )}
                    {latLong && (
                      <View className="flex-row mt-1">
                        <Text className="text-xs font-semibold text-[#0F5329] w-24">
                          Coordinates:
                        </Text>
                        <Text
                          className="text-xs text-gray-800 flex-1"
                          style={{ fontFamily: "monospace" }}
                        >
                          {latLong}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </>
            );
          })()}
        </View>

        <Link
          href="/request-pickup"
          className="bg-[#0F5329] px-6 py-3 rounded-full shadow-lg mt-2"
        >
          <Text className="text-white text-center text-base font-semibold tracking-wide">
            🚛 REQUEST A PICKUP
          </Text>
        </Link>
      </View>

      {/* Next Pickup Card */}

      {/* Sell Scraps Section */}
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
            className="bg-[#E0E0D5] h-[6rem] rounded-lg shadow-md flex-1 items-center justify-center"
          >
            <Text>{deal}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
      onPress={logout}
      className="bg-[#C0CC8A] p-3 mt-8 rounded-lg shadow-md items-center justify-center">
        <Text className="text-white">SHOW MORE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
