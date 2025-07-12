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
import { useMenu } from "../context/MenuContext";

const BugReportPage = () => {
  const {toggleMenu}=useMenu()
  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={router.back} className="mr-4">
            <Ionicons
              name="chevron-back"
              size={24}
              className="text-primary-btnLight"
            />
          </TouchableOpacity>
          <Text className="text-primary-button text-xl font-bold">
            Report a Bug
          </Text>
        </View>
        <View>
          {/* Menu button */}
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={27} className="text-primary-button" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <ScrollView className="px-4 pb-10 pt-4">
        {/* Description */}
        <Text className="text-gray-300 mb-4 leading-6">
          If something isn’t working as expected in Scribbly, let us know
          exactly what went wrong. Be as specific as possible.
        </Text>

        {/* Email (optional) */}
        <label className="text-gray-400 font-medium">Email (optional)</label>
        <TextInput
          placeholder="i.e dikie001@domain.com"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          keyboardType="email-address"
          className="bg-gray-800 text-white px-4 py-3 ring-1 focus:ring-2 outline-0 ring-primary-btnLight rounded-xl mb-4"
        />

        {/* Bug title */}
        <label className="text-gray-400 font-medium">What’s the issue?</label>
        <TextInput
          placeholder="e.g. Notes disappear after saving"
          placeholderTextColor="#6b7280"
          className="bg-gray-800 text-white ring-1 focus:ring-2 outline-0 ring-primary-btnLight px-4 py-3 rounded-xl mb-4"
        />

        {/* Steps to reproduce */}
        <label className="text-gray-400 font-medium">Steps to Reproduce</label>
        <TextInput
          placeholder={`1. Open Scribbly\n2. Create a note\n3. Save it\n4. Close the app\n5. Reopen — note is gone`}
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          multiline
          numberOfLines={5}
          className="bg-gray-800 text-white ring-1 focus:ring-2 outline-0 ring-primary-btnLight px-4 py-3 rounded-xl mb-4"
        />

        {/* Device info */}
        <label className="text-gray-400 font-medium">
          Device / Version Info
        </label>
        <TextInput
          placeholder="e.g. Infinix X665, Android 13"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-4"
        />

        {/* Severity selector */}
        <label className="text-gray-400 font-medium">How serious is it?</label>
        <TextInput
          placeholder="e.g. Crash / Data Loss / UI Bug"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-6"
        />

        {/* Submit button */}
        <TouchableOpacity
          onPress={() => alert("Bug report submitted.")}
          className="bg-red-600 p-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold">Submit Bug Report</Text>
        </TouchableOpacity>

        {/* Note */}
        <Text className="text-primary-btnLight text-sm text-center mt-6">
          Thanks for helping improve Scribbly. We review all reports seriously.
        </Text>
      </ScrollView>
    </View>
  );
};

export default BugReportPage;
