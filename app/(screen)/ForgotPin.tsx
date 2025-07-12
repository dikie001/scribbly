import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const router = useRouter();

  const handleReset = async () => {
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
    <View className="flex-1 bg-black px-6 py-10 justify-center">
      <Text className="text-white text-2xl mb-6 font-bold">Forgot PIN</Text>

      <TextInput
        placeholder="Email address"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="bg-gray-800 text-white p-4 mb-4 rounded-xl"
      />

      <TextInput
        placeholder="New PIN"
        placeholderTextColor="#999"
        secureTextEntry
        keyboardType="numeric"
        value={newPin}
        onChangeText={setNewPin}
        className="bg-gray-800 text-white p-4 mb-4 rounded-xl"
      />

      <TextInput
        placeholder="Confirm New PIN"
        placeholderTextColor="#999"
        secureTextEntry
        keyboardType="numeric"
        value={confirmPin}
        onChangeText={setConfirmPin}
        className="bg-gray-800 text-white p-4 mb-6 rounded-xl"
      />

      <TouchableOpacity
        onPress={handleReset}
        className="bg-primary-button py-4 rounded-xl"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Reset PIN
        </Text>
      </TouchableOpacity>
    </View>
  );
}
