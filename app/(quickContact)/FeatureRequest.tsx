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

const FeatureRequestPage = () => {
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
            Feature Request
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="px-4 pb-10 mt-2">
        {/* Intro */}
        <Text className="text-gray-300 mb-4 leading-6">
          Got a dope idea or feature you'd love in Scribbly? Let us know below.
        </Text>

        {/* Form Fields */}
        <label className="text-gray-400 font-medium">
          Your Name (Optional)
        </label>
        <TextInput
          placeholder="i.e johny doe"
          autoFocus
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-4"
        />

        <label className="text-gray-400 font-medium">Feature Title</label>
        <TextInput
          placeholder="i.e Add folder support"
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-4"
        />

        <label className="text-gray-400 font-medium">Description</label>
        <TextInput
          placeholder="Describe how the feature should work..."
          placeholderTextColor="rgb(196 181 253 / 0.5)"
          multiline
          numberOfLines={4}
          className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-white px-4 py-3 rounded-xl mb-6"
        />

        {/* Submit */}
        <TouchableOpacity
          className="bg-primary-button p-4 rounded-xl items-center"
          onPress={() => alert("Feature request submitted.")}
        >
          <Text className="text-white font-bold">Send Request</Text>
        </TouchableOpacity>

        {/* Footer Note */}
        <Text className="text-primary-btnLight text-sm text-center mt-6">
          Every request counts — thanks for helping us grow Scribbly.
        </Text>
      </ScrollView>
    </View>
  );
};

export default FeatureRequestPage;
