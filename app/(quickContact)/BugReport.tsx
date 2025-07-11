import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BugReportPage = () => {
  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={router.back} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="#e5e7eb" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Report a Bug</Text>
        </View>
      </View>

      {/* Body */}
      <ScrollView className="px-4 pb-10">
        {/* Description */}
        <Text className="text-gray-300 mb-4">
          If something isn’t working as expected in Scribbly, let us know
          exactly what went wrong. Be as specific as possible.
        </Text>

        {/* Email (optional) */}
        <Text className="text-gray-400 mb-1">Email (optional)</Text>
        <TextInput
          placeholder="you@domain.com"
          placeholderTextColor="#6b7280"
          keyboardType="email-address"
          className="bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"
        />

        {/* Bug title */}
        <Text className="text-gray-400 mb-1">What’s the issue?</Text>
        <TextInput
          placeholder="e.g. Notes disappear after saving"
          placeholderTextColor="#6b7280"
          className="bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"
        />

        {/* Steps to reproduce */}
        <Text className="text-gray-400 mb-1">Steps to Reproduce</Text>
        <TextInput
          placeholder={`1. Open Scribbly\n2. Create a note\n3. Save it\n4. Close the app\n5. Reopen — note is gone`}
          placeholderTextColor="#6b7280"
          multiline
          numberOfLines={5}
          className="bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"
        />

        {/* Device info */}
        <Text className="text-gray-400 mb-1">Device / Version Info</Text>
        <TextInput
          placeholder="e.g. Infinix X665, Android 13"
          placeholderTextColor="#6b7280"
          className="bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"
        />

        {/* Severity selector */}
        <Text className="text-gray-400 mb-1">How serious is it?</Text>
        <TextInput
          placeholder="e.g. Crash / Data Loss / UI Bug"
          placeholderTextColor="#6b7280"
          className="bg-gray-800 text-white px-4 py-3 rounded-xl mb-6"
        />

        {/* Submit button */}
        <TouchableOpacity
          onPress={() => alert("Bug report submitted.")}
          className="bg-red-600 p-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold">Submit Bug Report</Text>
        </TouchableOpacity>

        {/* Note */}
        <Text className="text-gray-600 text-sm text-center mt-6">
          Thanks for helping improve Scribbly. We review all reports seriously.
        </Text>
      </ScrollView>
    </View>
  );
};

export default BugReportPage;
