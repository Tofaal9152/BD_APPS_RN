import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";

const mockPoints = [
  { latitude: 23.8103, longitude: 90.4125, weight: 1 }, // Dhaka
  { latitude: 23.7806, longitude: 90.2792, weight: 0.8 },
  { latitude: 23.7611, longitude: 90.4203, weight: 0.7 },
  { latitude: 23.7321, longitude: 90.3922, weight: 0.9 },
  { latitude: 23.7541, longitude: 90.3723, weight: 0.6 },
  { latitude: 23.7405, longitude: 90.3779, weight: 1 },
  { latitude: 23.7782, longitude: 90.3891, weight: 0.5 },
  { latitude: 23.7592, longitude: 90.3812, weight: 0.8 },
  { latitude: 23.7653, longitude: 90.3974, weight: 0.9 },
  { latitude: 23.7432, longitude: 90.4211, weight: 0.7 },
];

const Heatmapsec = () => {
  return (
    <View style={styles.container} className="bg-white">
      <Text style={styles.title}>📊 Heatmap of Pickup Requests</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 23.76,
          longitude: 90.39,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Heatmap
          points={mockPoints}
          radius={40}
          opacity={0.7}
          gradient={{
            colors: ["#00BCD4", "#2196F3", "#3F51B5", "#E91E63", "#F44336"],
            startPoints: [0.01, 0.25, 0.5, 0.75, 1],
            colorMapSize: 256,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 12,
    textAlign: "center",
    color: "#0F5329",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 80,
  },
});

export default Heatmapsec;
