import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/src/components/ui/button";
import { Input } from "~/src/components/ui/input";
import { Label } from "~/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/src/components/ui/select";
import api from "~/src/lib/api";
import { useAuthStore } from "~/src/store/authStore";
export default function RequestPickup() {
  const { id } = useAuthStore();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [loading, setLoading] = useState(false);
  const [wasteType, setWasteType] = useState("organic");
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [instructions, setInstructions] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    })();
  }, []);

  const handleSubmit = async () => {
    if (!location) {
      Alert.alert("Location not available", "Please allow location access.");
      return;
    }

    const payload = {
      household_id: id,
      waste_type: wasteType,
      estimated_weight: parseFloat(estimatedWeight),
      pickup_location: {
        lat: location.lat,
        lng: location.lng,
        address,
        landmark,
        instructions,
      },
      preferred_time: preferredTime,
      notes,
    };
    console.log("Submitting pickup request with payload:", payload);
    try {
      setLoading(true);
      const res = await api.post("/api/pickup-requests", payload);

      console.log("Pickup request response:", res.data);
      Alert.alert("Success", "Pickup request submitted successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit pickup request.");
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      enableOnAndroid
      className="bg-[#F4F4F4]"
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <Button
        onPress={handleBack}
        className="flex-row items-center mb-4 gap-2 bg-white"
      >
        <ArrowLeft />
        <Text className="text-[#0F5329] text-lg font-semibold">
          Back to Home
        </Text>
      </Button>

      <Text className="text-2xl font-bold mb-4">🚛 Request a Pickup</Text>

      {/* Waste Type Selector */}
      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="wasteType">
          Type of Waste
        </Label>
        <Select
          defaultValue={{ label: "Organic", value: "organic" }}
          className="text-[#0F5329] dark:bg-white dark:border-gray-300"
          onValueChange={(
            option: { label: string; value: string } | undefined
          ) => {
            if (option) setWasteType(option.value);
          }}
        >
          <SelectTrigger className="bg-white rounded p-3 mt-1">
            <SelectValue placeholder="Select Waste Type" />
          </SelectTrigger>
          <SelectContent insets={contentInsets}>
            <SelectGroup>
              <SelectLabel>Waste Types</SelectLabel>
              <SelectItem value="organic" label="Organic">
                Organic
              </SelectItem>
              <SelectItem value="plastic" label="Plastic">
                Plastic
              </SelectItem>
              <SelectItem value="paper" label="Paper">
                Paper
              </SelectItem>
              <SelectItem value="metal" label="Metal">
                Metal
              </SelectItem>
              <SelectItem value="e-waste" label="E-Waste">
                E-Waste
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="estimatedWeight">
          Estimated Weight (kg)
        </Label>
        <Input
          id="estimatedWeight"
          keyboardType="numeric"
          value={estimatedWeight}
          onChangeText={setEstimatedWeight}
          placeholder="Enter weight in kg"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="address">
          Address
        </Label>
        <Input
          id="address"
          value={address}
          onChangeText={setAddress}
          placeholder="Pickup address"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="landmark">
          Landmark
        </Label>
        <Input
          id="landmark"
          value={landmark}
          onChangeText={setLandmark}
          placeholder="Nearby landmark"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="instructions">
          Instructions
        </Label>
        <Input
          id="instructions"
          value={instructions}
          onChangeText={setInstructions}
          placeholder="Any special instructions"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-4">
        <Label className="text-[#0F5329]" htmlFor="preferredTime">
          Preferred Time
        </Label>
        <Input
          id="preferredTime"
          value={preferredTime}
          onChangeText={setPreferredTime}
          placeholder="2025-06-17T08:30:00.000Z"
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>

      <View className="mb-5">
        <Label className="text-[#0F5329]" htmlFor="notes">
          Notes
        </Label>
        <Input
          id="notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Extra notes (optional)"
          multiline
          className="text-[#0F5329] dark:bg-white dark:border-gray-400 "
        />
      </View>
      <Button
        disabled={loading}
        onPress={handleSubmit}
        className="bg-[#949D6A] rounded-lg py-2 gap-2 flex-row items-center justify-center"
      >
        {loading && (
          <View>
            <FontAwesome
              name="spinner"
              size={16}
              color="#fff"
              className="animate-spin"
            />
          </View>
        )}
        <Text className="text-white text-xl">Request Pickup</Text>
      </Button>
    </KeyboardAwareScrollView>
  );
}
