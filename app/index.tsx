import axiosInstance from "@/axiosConfig";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, Redirect, router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";
import LoadingOverlay from "./components/LoadingOverlay";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token, isLoading: authLoading, login } = useAuth();

  if (authLoading) return null;

  if (token) {
    return <Redirect href="/(tabs)/Home" />;
  }

  const handleLogin = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "❌ Invalid Email Address!",
        text2: "Please input your email address",
      });
      return;
    }

    if (!password.trim()) {
      Toast.show({
        type: "error",
        text1: "❌ Invalid Password!",
        text2: "Please input your password",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/user/login",
        {
          emailAddress: email,
          password,
        },
        { withCredentials: true }
      );

      if (!response.data?.success) {
        Toast.show({
          type: "error",
          text1: "❌ Login Failed",
          text2: response.data?.message || "Something went wrong",
        });
      } else {
        await login(response.data.token);

        Toast.show({
          type: "success",
          text1: "✅ Login Successful!",
        });

        router.replace("/(tabs)/Home");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "❌ Login Error",
        text2: error?.response?.data?.message || error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading && <LoadingOverlay />}

      <KeyboardAvoidingView
        className="flex-1 justify-center px-6"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View className="mb-10">
          <View className="items-center mb-10">
            <Image source={logo} style={{ width: 150, height: 150 }} />
          </View>

          <Text className="text-2xl font-bold text-center text-gray-800">
            Rain2Cane
          </Text>

          <Text className="text-center text-gray-500 mt-2">
            Welcome back! Login to your account
          </Text>
        </View>

        {/* Email */}
        <View className="flex-row mb-4">
          <View className="border border-gray-300 rounded-l-lg justify-center px-3">
            <MaterialIcons name="email" size={26} color="green" />
          </View>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 text-gray-800"
          />
        </View>

        {/* Password */}
        <View className="flex-row mb-4">
          <View className="border border-gray-300 rounded-l-lg justify-center px-3">
            <MaterialIcons name="lock" size={26} color="green" />
          </View>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 text-gray-800"
          />
        </View>

        {/* Forgot password */}
        <Link href="/OTPRequestScreen" asChild>
          <TouchableOpacity className="self-end mb-6">
            <Text className="text-blue-600 font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Login button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 py-4 rounded-lg mb-6"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity>

        {/* Sign up */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don’t have an account? </Text>
          <Link href="/SignupScreen" asChild>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
