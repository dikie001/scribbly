import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PrivacyPolicyPage = () => {
  return (
    <View className="flex-1 bg-primary-dark ">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={router.back} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="#e5e7eb" />
          </TouchableOpacity>
          <Text className="text-primary-button text-xl font-bold">
            Privacy Policy
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 pb-10 pt-2 ">
        <View className="p-4 rounded-xl pt-8 shadow-xl elevation-lg bg-white/5">
          <Text className="text-gray-200 text-base mb-4">
            Welcome to{" "}
            <Text className="font-bold text-primary-btnLight">Scribbly</Text>.
            Your privacy is very important to us. This Privacy Policy explains
            how Scribbly handles your data.
          </Text>
          {/* Offline nature */}
          <Text className="text-gray-400 font-semibold mb-2">Offline App</Text>
          <Text className="text-gray-300 mb-4">
            Scribbly is fully offline. All your notes are stored locally on your
            device. We do not collect, store, or share any of your personal
            data.
          </Text>
          {/* What you can do */}
          <Text className="text-gray-400 font-semibold mb-2">
            What You Can Do
          </Text>
          <Text className="text-gray-300 mb-4">
            With Scribbly, you can create, edit, delete, organize, and share
            notes. These actions only affect your device and are not transmitted
            to any server.
          </Text>
          {/* No accounts */}
          <Text className="text-gray-400 font-semibold mb-1">
            No Account Required
          </Text>
          <Text className="text-gray-300 mb-4">
            Scribbly does not require you to create an account or sign in.You'll
            have to secure your private notes by a 4 digit pin that is
            completely offline. Your content belongs 100% to you.
          </Text>
          {/* Permissions */}
          <Text className="text-gray-400 font-semibold mb-1">Permissions</Text>
          <Text className="text-gray-300 mb-4">
            We may request access to storage only for saving your notes. We do
            not access any other data on your device.
          </Text>
          {/* Sharing */}
          <Text className="text-gray-400 font-semibold mb-1">
            Sharing Notes
          </Text>
          <Text className="text-gray-300 mb-4">
            When you choose to share a note, the content is sent using your
            device’s share system (e.g., WhatsApp, email). Scribbly itself does
            not track or store what you share.
          </Text>
          {/* Changes */}
          <Text className="text-gray-400 font-semibold mb-1">
            Policy Changes
          </Text>
          <Text className="text-gray-300 mb-4">
            If we ever make changes to this privacy policy, we'll update it
            right here in the app. No hidden terms, no nonsense.
          </Text>
          {/* Contact */}
          <Text className="text-gray-400 font-semibold mb-1">Need Help?</Text>
          <Text className="text-gray-300">
            If you have any questions about privacy, contact us through the
            support page.
          </Text>
          {/* Footer */}
          <View className="items-center mt-10">
            <Text className="text-primary-btnLight text-sm">
              Scribbly © {new Date().getFullYear()} — All Rights Reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyPage;
