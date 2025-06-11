import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { UserCircle2Icon } from "lucide-react-native";
import { default as React, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CompanyScreen from "~/src/components/screens/tabs/CompanyScreen";
import HouseholdScreen from "~/src/components/screens/tabs/HouseholdScreen";
import { Button } from "~/src/components/ui/button";
import { Text } from "~/src/components/ui/text";
import { useAuthStore } from "~/src/store/authStore";

export default function HomePage() {
  const [roles, setRoles] = useState<string | null>(null);
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

  const { role } = useAuthStore();
  useEffect(() => {
    if (role) {
      setRoles(role);
    } else {
      setRoles("household");
    }
  }, [role]);

  const router = useRouter();
  const handleClick = () => {
    if (roles === "household") {
      // Navigate to household request page
      router.push("/request-pickup");
    } else {
      alert("You are not authorized to request a pickup as a company.");
    }
  };
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

        <Button
          onPress={handleClick}
          className="bg-[#0F5329] px-6 py-3 rounded-full shadow-lg mt-2"
        >
          <Text className="text-white text-center text-base font-semibold tracking-wide">
            🚛 REQUEST A PICKUP
          </Text>
        </Button>
      </View>

      {roles === "household" && <HouseholdScreen />}
      {roles === "company" && <CompanyScreen />}
    </ScrollView>
  );
}
