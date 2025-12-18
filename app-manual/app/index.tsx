import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Car, Activity, Clock } from 'lucide-react-native';
import axiosInstance from './axiosInstance';

interface ParkingSlot {
  id: number;
  name: string;
  occupied: boolean;
  pirValue: number;
  lastUpdate: Date;
}

export default function App() {
  const [data, setData] = useState({});
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([
    {
      id: 1,
      name: 'Slot A1',
      occupied: true,
      pirValue: 850,
      lastUpdate: new Date(),
    },
    {
      id: 2,
      name: 'Slot A2',
      occupied: false,
      pirValue: 45,
      lastUpdate: new Date(),
    },
    {
      id: 3,
      name: 'Slot B1',
      occupied: true,
      pirValue: 920,
      lastUpdate: new Date(),
    },
    {
      id: 4,
      name: 'Slot B2',
      occupied: false,
      pirValue: 78,
      lastUpdate: new Date(),
    },
  ]);

  useEffect(()=>{
  const func=async()=>{
 try{
  const response = await axiosInstance.get("/device/get");
  if (!response.data.success){
    console.log(JSON.stringify(response.data.message));
    setData([]);
     }else{
      setData(response.data.data[0]);
      console.log(JSON.stringify(response.data)); 
  }
 }catch(error){
   console.error("Data retrieval error:", error.message); 
 }
}

  func();
},[]);
  /*
  // Update sensor readings every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setParkingSlots((prevSlots) =>
        prevSlots.map((slot) => {
          // Randomly change occupancy status (20% chance)
          const shouldChangeStatus = Math.random() < 0.2;
          const newOccupied = shouldChangeStatus ? !slot.occupied : slot.occupied;

          // Generate realistic PIR values based on occupancy
          let newPirValue: number;
          if (newOccupied) {
            // Occupied: 800-1000
            newPirValue = Math.floor(Math.random() * 201) + 800;
          } else {
            // Vacant: 20-120
            newPirValue = Math.floor(Math.random() * 101) + 20;
          }

          return {
            ...slot,
            occupied: newOccupied,
            pirValue: newPirValue,
            lastUpdate: new Date(),
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  */

  const occupiedCount = parkingSlots.filter((slot) => slot.occupied).length;
  const vacantCount = parkingSlots.length - occupiedCount;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-white mb-2">
              Smart Parking
            </Text>
            <Text className="text-gray-400">Real-time Monitoring System</Text>
          </View>

          {/* Summary Cards */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-emerald-900/30 border border-emerald-700/50 rounded-2xl p-4">
              <Text className="text-emerald-400 text-sm mb-1">Available</Text>
              <Text className="text-3xl font-bold text-emerald-300">
                {vacantCount}
              </Text>
            </View>
            <View className="flex-1 bg-red-900/30 border border-red-700/50 rounded-2xl p-4">
              <Text className="text-red-400 text-sm mb-1">Occupied</Text>
              <Text className="text-3xl font-bold text-red-300">
                {occupiedCount}
              </Text>
            </View>
          </View>

          {/* Parking Slots */}
          <View className="gap-4">
            {parkingSlots.map((slot) => (
              <View
                key={slot.id}
                className={`rounded-2xl p-5 border-2 ${
                  slot.occupied
                    ? 'bg-red-950/40 border-red-800/60'
                    : 'bg-emerald-950/40 border-emerald-800/60'
                }`}
              >
                {/* Slot Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`p-2 rounded-xl ${
                        slot.occupied ? 'bg-red-900/50' : 'bg-emerald-900/50'
                      }`}
                    >
                      <Car
                        size={24}
                        color={slot.occupied ? '#fca5a5' : '#6ee7b7'}
                      />
                    </View>
                    <View>
                      <Text className="text-white text-xl font-semibold">
                        {slot.name}
                      </Text>
                      <View className="flex-row items-center gap-1 mt-1">
                        <View
                          className={`w-2 h-2 rounded-full ${
                            slot.occupied ? 'bg-red-400' : 'bg-emerald-400'
                          }`}
                        />
                        <Text
                          className={`text-sm ${
                            slot.occupied ? 'text-red-400' : 'text-emerald-400'
                          }`}
                        >
                          {slot.occupied ? 'Occupied' : 'Vacant'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* PIR Sensor Reading */}
                <View className="mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-2">
                      <Activity
                        size={16}
                        color={slot.occupied ? '#fca5a5' : '#6ee7b7'}
                      />
                      <Text className="text-gray-400 text-sm">
                        PIR Sensor Reading
                      </Text>
                    </View>
                    <Text
                      className={`text-lg font-bold ${
                        slot.occupied ? 'text-red-300' : 'text-emerald-300'
                      }`}
                    >
                      {slot.pirValue}
                    </Text>
                  </View>

                  {/* Progress Bar */}
                  <View className="bg-gray-800 rounded-full h-3 overflow-hidden">
                    <View
                      className={`h-full rounded-full ${
                        slot.occupied ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(slot.pirValue / 1000) * 100}%` }}
                    />
                  </View>
                </View>

                {/* Timestamp */}
                <View className="flex-row items-center gap-2 pt-3 border-t border-gray-700/50">
                  <Clock size={14} color="#9ca3af" />
                  <Text className="text-gray-400 text-xs">
                    Last updated: {formatTime(slot.lastUpdate)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Footer Info */}
          <View className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <Text className="text-gray-400 text-xs text-center">
              System updates every 3 seconds • Real-time monitoring active
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
