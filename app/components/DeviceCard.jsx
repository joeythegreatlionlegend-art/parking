import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DeviceCard = ({ device, pressEventHandler }) => {
  const handleOpenStream = () => {
    if (!device.Camera) {
      console.log("No camera registered for this device");
      return;
    }
    console.log("Opening livestream for:", device.deviceID);
  };

  return (
    <TouchableOpacity
      className="bg-[#132A3E] mx-4 mt-4 p-4 rounded-xl border border-[#1F3A52]"
      activeOpacity={0.9}
      onPress={() => pressEventHandler?.(device)}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center pb-3 mb-3 border-b border-[#1F3A52]">
        <Text className="text-xl font-extrabold text-[#E5E7EB]">
          {device.deviceID}
        </Text>
        <Octicons
          name="dot-fill"
          size={26}
          color={device.isOnline ? "#4CAF50" : "#DC2626"}
        />
      </View>

      {/* Sensors */}
      <View className="mb-4">
        <Text className="text-[#E5E7EB] font-semibold mb-1">
          Ultrasonic Sensor:
          <Text className="text-[#9CA3AF]"> {device.UltraSonicSensor} cm</Text>
        </Text>

        <Text className="text-[#E5E7EB] font-semibold">
          IR Sensor:
          <Text className="text-[#9CA3AF]">
            {" "}
            {device.IrSensor ? "Motion Detected" : "No Motion"}
          </Text>
        </Text>
      </View>

      {/* Camera Button */}
      {device.Camera ? (
        <TouchableOpacity
          onPress={handleOpenStream}
          className="flex-row items-center justify-center bg-[#1E88E5] py-3 rounded-xl mb-3"
        >
          <MaterialCommunityIcons
            name="video-outline"
            size={22}
            color="white"
          />
          <Text className="ml-3 text-white font-semibold">
            Open Live Stream
          </Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-xs text-[#9CA3AF] mb-3">
          No camera registered
        </Text>
      )}

      {/* Last Update */}
      <Text className="text-xs text-[#9CA3AF]">
        Last update:{" "}
        {device.lastUpdate
          ? new Date(device.lastUpdate).toLocaleString()
          : "No data"}
      </Text>
    </TouchableOpacity>
  );
};

export default DeviceCard;
