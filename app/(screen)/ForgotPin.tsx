import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = async () => {
    setLoading(true)
    if (!email.trim()) {
      Alert.alert("Error", "Enter your email");
      return;
    }

    if (newPin !== confirmPin) {
      Alert.alert("Error", "PINs do not match");
      return;
    }

    if (newPin.length !== 4) {
      Alert.alert("Error", "PIN must be 4 digits");
      return;
    }

    // Simulate backend call: verify email & reset PIN
    // Replace with real API call
    const isValidEmail = email === "user@example.com"; // demo only

    if (!isValidEmail) {
      Alert.alert("Error", "Email not found");
      return;
    }

    Alert.alert("Success", "PIN reset successfully");
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-primary-dark px-4 py-10 justify-center">
      <TouchableOpacity
        onPress={router.back}
        className="mr-4 absolute top-4"
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          className="text-primary-btnLight"
        />
      </TouchableOpacity>
      <View className="bg-white/5 p-4 py-10 rounded-xl shadow-xl elevation-lg">
        <Text className="text-white text-2xl mb-2 font-bold">Forgot PIN</Text>
        <Text className="text-gray-300 mb-4 font-medium">
          Enter your email below, the new pin will be sent to you
        </Text>

        <TextInput
          placeholder="Email address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="off"
          autoFocus
          value={email}
          onChangeText={setEmail}
          className="bg-gray-900 text-white p-4 h-10 mb-4 rounded-xl ring-1 outline-0 focus:ring-2"
        />
        {/* 
      <TextInput
        placeholder="New PIN"
        placeholderTextColor="#999"
        secureTextEntry
        keyboardType="numeric"
        value={newPin}
        onChangeText={setNewPin}
        className="bg-gray-800 text-white p-4 mb-4 rounded-xl ring-1 outline-0 focus:ring-2"
      />

      <TextInput
        placeholder="Confirm New PIN"
        placeholderTextColor="#999"
        secureTextEntry
        keyboardType="numeric"
        value={confirmPin}
        onChangeText={setConfirmPin}
        className="bg-gray-800 text-white p-4 mb-6 rounded-xl"
      /> */}

        <TouchableOpacity
          onPress={handleReset}
          className="bg-primary-button py-3 rounded-xl"
        >
          <Text className="text-white text-center  font-medium">
            {loading ? (
              <Text className="gap-2 items-center flex flex-row justify-center">
                <ActivityIndicator color={'#fff'}/> Sending...
              </Text>
            ) : (
              "Send Pin"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
