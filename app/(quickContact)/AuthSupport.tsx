import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AuthSupportPage = () => {
  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={router.back} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="#e5e7eb" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Auth Support</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="px-4 pb-10">
        {/* Info */}
        <Text className="text-gray-300 mb-4 leading-6">
          Having trouble signing in, unlocking Scribbly, or accessing your
          notes? Fill the form below to contact support.
        </Text>

        {/* Form Fields */}
        <Text className="text-gray-400 mb-1">Your Email</Text>
        <TextInput
          autoFocus
          placeholder="i.e johndoe@email.com"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-4"
        />

        <label className="text-slate-400 font-medium">Issue Summary</label>
        <TextInput
          placeholder="e.g., Can’t reset my password"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-4"
        />

        <label className="text-slate-400 font-medium">Details (Optional)</label>
        <TextInput
          placeholder="Add more info here..."
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          multiline
          numberOfLines={4}
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-6"
        />

        {/* Submit */}
        <TouchableOpacity
          className="bg-primary-button p-4 rounded-xl items-center"
          onPress={() => {
            // Placeholder for submission logic
            alert("Support request submitted.");
          }}
        >
          <Text className="text-white font-bold">Submit Request</Text>
        </TouchableOpacity>

        {/* Note */}
        <Text className="text-gray-600 text-sm text-center mt-6">
          We'll get back to you within 24 hours.
        </Text>
      </ScrollView>
    </View>
  );
};

export default AuthSupportPage;
