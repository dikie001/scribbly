import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { stringify } from "uuid";

const USER_DETAILS = "scribbly-user-details";

export default function ResetPasswordScreen() {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    if (!/^\d{4}$/.test(newPin)) {
      Alert.alert("Invalid", "PIN must be exactly 4 digits");
      console.log("Invalid", "PIN must be exactly 4 digits");
      return;
    }

    if (newPin !== confirmPin) {
      Alert.alert("Mismatch", "New PINs do not match");
      console.log('Mismatch", "New PINs do not match');
      return;
    }

    // const savedPin = await AsyncStorage.getItem("appPin");

    // if (savedPin !== oldPin) {
    //   Alert.alert("Wrong PIN", "Old PIN is incorrect");
    //   return;
    // }

    const userDetails:any = await AsyncStorage.getItem(USER_DETAILS);
    const parsed = JSON.parse(userDetails)
    const updatedUsers = {...parsed, pin:newPin}
    console.log(updatedUsers)
    await AsyncStorage.setItem(USER_DETAILS, JSON.stringify(updatedUsers))
    // Alert.alert("Success", "PIN changed successfully");
    // router.back();

    console.log('successfull!')


  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-primary-dark px-4 py-10 justify-center"
    >
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
      <View className="bg-white/5 elevation-xl px-4 py-10 rounded-xl shadow-xl">
        <Text className="text-primary-button text-2xl font-bold mb-8 text-center">
          Reset Your PIN
        </Text>

        <TextInput
          placeholder="Enter current PIN"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          keyboardType="numeric"
          autoComplete="off"
          secureTextEntry
          maxLength={4}
          value={oldPin}
          onChangeText={setOldPin}
          className="bg-gray-900 text-white px-4 h-10 outline-0 ring-1 focus:ring-2  rounded-xl mb-4"
        />

        <TextInput
          placeholder="New PIN (4 digits)"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          value={newPin}
          onChangeText={setNewPin}
          className="bg-gray-900 text-white px-4 h-10 outline-0 ring-1 focus:ring-2  rounded-xl mb-4"
        />

        <TextInput
          placeholder="Confirm New PIN"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          value={confirmPin}
          onChangeText={setConfirmPin}
          className="bg-gray-900 text-white px-4 h-10 outline-0 ring-1 focus:ring-2  rounded-xl mb-6"
        />

        <TouchableOpacity
          onPress={handleReset}
          className="bg-primary-button py-3 rounded-xl"
        >
          <Text className="text-white text-center  font-medium">
            Change PIN
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
