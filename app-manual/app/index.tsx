import React,{ useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Activity, Car, Clock } from 'lucide-react-native';
import axiosInstance from '../axiosConfig.js';



interface ParkingSlot {
  id: number;
  name: string;
  occupied: boolean;
  pirValue: number;
  lastUpdated: Date;
}

// ParkingSlotCard Component
function ParkingSlotCard({ slot }: { slot: ParkingSlot }) {
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 10) return 'Just now';
    return `${seconds}s ago`;
  };

  return (
    <View
      className={`rounded-xl p-4 border-2 ${
        slot.occupied
          ? 'bg-red-950 border-red-800'
          : 'bg-green-950 border-green-800'
      }`}
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center gap-3">
          <View
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              slot.occupied ? 'bg-red-900' : 'bg-green-900'
            }`}
          >
            <Car
              size={24}
              color={slot.occupied ? '#fca5a5' : '#86efac'}
            />
          </View>
          <View>
            <Text className="text-white text-lg font-semibold">{slot.name}</Text>
            <Text
              className={`text-sm ${
                slot.occupied ? 'text-red-300' : 'text-green-300'
              }`}
            >
              {slot.occupied ? 'Occupied' : 'Available'}
            </Text>
          </View>
        </View>

        <View
          className={`px-3 py-1 rounded-full ${
            slot.occupied
              ? 'bg-red-900'
              : 'bg-green-900'
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              slot.occupied ? 'text-red-200' : 'text-green-200'
            }`}
          >
            {slot.occupied ? 'BUSY' : 'FREE'}
          </Text>
        </View>
      </View>

      {/* PIR Sensor Reading */}
      <View className="bg-slate-900 rounded-lg p-3">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-2">
            <Activity size={16} color="#60a5fa" />
            <Text className="text-slate-400 text-sm">PIR Sensor</Text>
          </View>
          <Text className="text-white font-semibold">{slot.pirValue}</Text>
        </View>

        {/* PIR Value Bar */}
        <View className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
          <View
            className={`h-full ${
              slot.occupied ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((slot.pirValue / 1000) * 100, 100)}%` }}
          />
        </View>

        <View className="flex-row items-center gap-1">
          <Clock size={12} color="#64748b" />
          <Text className="text-xs text-slate-500">{getTimeAgo(slot.lastUpdated)}</Text>
        </View>
      </View>
    </View>
  );
}

// Main App Component
export default function App() {
  const [slots, setSlots] = useState<ParkingSlot[]>([
    { id: 1, name: 'Slot A1', occupied: true, pirValue: 892, lastUpdated: new Date() },
    { id: 2, name: 'Slot A2', occupied: false, pirValue: 45, lastUpdated: new Date() },
    { id: 3, name: 'Slot A3', occupied: true, pirValue: 867, lastUpdated: new Date() },
    { id: 4, name: 'Slot A4', occupied: false, pirValue: 32, lastUpdated: new Date() },
  ]);

  // Simulate real-time PIR sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSlots(prevSlots =>
        prevSlots.map(slot => ({
          ...slot,
          pirValue: slot.occupied
            ? Math.floor(Math.random() * 200) + 800 // Occupied: 800-1000
            : Math.floor(Math.random() * 100) + 20,  // Vacant: 20-120
          lastUpdated: new Date(),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const occupiedCount = slots.filter(slot => slot.occupied).length;
  const availableCount = slots.length - occupiedCount;

  const [data, setData] = useState();
  
  
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView className="flex-1 bg-slate-900">
        {/* Header */}
        <View className="bg-slate-800 border-b border-slate-700 px-4 py-4">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <Activity size={24} color="white" />
            </View>
            <View>
              <Text className="text-white text-xl font-bold">Smart Parking</Text>
              <Text className="text-slate-400 text-sm">Real-time Monitoring</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-slate-900 rounded-lg p-3 border border-slate-700">
              <Text className="text-slate-400 text-sm">Available</Text>
              <Text className="text-green-400 text-2xl font-bold">{availableCount}</Text>
            </View>
            <View className="flex-1 bg-slate-900 rounded-lg p-3 border border-slate-700">
              <Text className="text-slate-400 text-sm">Occupied</Text>
              <Text className="text-red-400 text-2xl font-bold">{occupiedCount}</Text>
            </View>
          </View>
        </View>

        {/* Parking Slots */}
        <View className="px-4 py-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-semibold">Parking Slots</Text>
            <View className="flex-row items-center gap-2">
              <View className="w-2 h-2 bg-green-500 rounded-full" />
              <Text className="text-slate-400 text-sm">Live</Text>
            </View>
          </View>

          <View className="gap-4">
            {slots.map(slot => (
              <ParkingSlotCard key={slot.id} slot={slot} />
            ))}
          </View>

          {/* Footer Info */}
          <View className="mt-6 bg-slate-900 border border-slate-700 rounded-lg p-4">
            <Text className="text-slate-400 text-sm text-center">
              PIR sensors update every 3 seconds
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
