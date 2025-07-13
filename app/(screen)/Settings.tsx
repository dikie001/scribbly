import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { useMenu } from "../context/MenuContext";

type SettingsType = {
  displayMode: boolean;
  autoSave: boolean;
  viewMode: boolean;
  notifications: boolean;
  usePin: boolean;
};

const SETTINGS = "scribbly-settings";

export default function SettingsPage() {
  // on focusing the screen
  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [])
  );

  //  Load settings from storage
  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem(SETTINGS);
      const parsedSettings = settings ? JSON.parse(settings) : [];
      setSettings(parsedSettings);
    } catch (err) {
      console.log("AsyncStorage: ", err);
    }
  };

  const { toggleMenu } = useMenu();
  const [currentSettings, setCurrentSettings] = useState<SettingsType[]>([]);

  const [settings, setSettings] = useState({
    displayMode: true,
    autoSave: true,
    viewMode: true,
    notifications: true,
    usePin: true,
  });

  // Handle switch toggle
  const handleSwitchToggle = async (key: string, val: boolean) => {
    const newSettings = { ...settings, [key]: val };
    setSettings(newSettings);
    try {
      await AsyncStorage.setItem(SETTINGS, JSON.stringify(newSettings));
    } catch (err) {
      console.log("AsyncStorage: ", err);
    }
  };

  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row justify-between p-4 items-center">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={router.back} className="mr-4">
            <Ionicons name="chevron-back" size={24} className="text-primary-btnLight" />
          </TouchableOpacity>
          <Text className="text-primary-button text-xl font-bold">Settings</Text>
        </View>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={27} className="text-primary-button" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="p-4">
        {/* Toggles with Icons */}
        <View className="flex-row  items-center p-4 bg-gray-800 rounded-xl mb-4">
          <Ionicons name="moon-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Dark Mode</Text>
            <Text className="text-gray-400 text-sm">Use dark theme</Text>
          </View>
          <Switch
            value={settings.displayMode}
            onValueChange={(val) => {
              handleSwitchToggle("displayMode", val);
            }}
          />
        </View>

        {/* Notes view style/ viewMode */}
        <View className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4">
          <Ionicons
            name={settings.viewMode ? "list" : "grid"}
            size={20}
            color="#9ca3af"
          />
          <View className="flex-1 ml-4">
            <Text className="text-white">Notes View Style</Text>
            <Text className="text-gray-400 text-sm">
              Currently: {settings.viewMode ? "List View" : "Grid View"}
            </Text>
          </View>
          <Switch
            value={settings.viewMode}
            onValueChange={(val) => {
              handleSwitchToggle("viewMode", val);
            }}
          />
        </View>

        {/* Auto save notes */}
        <View className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4">
          <Ionicons name="save-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Auto Save</Text>
            <Text className="text-gray-400 text-sm">
              Save notes automatically
            </Text>
          </View>
          <Switch
            value={settings.autoSave}
            onValueChange={(val) => handleSwitchToggle("autoSave", val)}
          />
        </View>

        {/* Enable notifications */}
        <View className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4">
          <Ionicons name="notifications-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Notifications</Text>
            <Text className="text-gray-400 text-sm">Enable notifications</Text>
          </View>
          <Switch
            value={settings.notifications}
            onValueChange={(val) => handleSwitchToggle("notifications", val)}
          />
        </View>

        {/* Allow use of a 4-digit pin for auth */}
        <View className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4">
          <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Use 4-digit PIN</Text>
            <Text className="text-gray-400 text-sm">Secure app access</Text>
          </View>
          <Switch
            value={settings.usePin}
            onValueChange={(val) => handleSwitchToggle("usePin", val)}
          />
        </View>

        {/* Navigation Links */}
        <TouchableOpacity
          className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4"
          onPress={() => router.push("/(screen)/PrivacyPolicy")}
        >
          <Ionicons name="shield-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Privacy Policy</Text>
            <Text className="text-gray-400 text-sm">How we handle data</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4"
          onPress={() => router.push("/(screen)/ResetPin")}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Reset Pin</Text>
            <Text className="text-gray-400 text-sm">
              Change your app login PIN
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4"
          onPress={() => router.push("/(screen)/ContactSupport")}
        >
          <Ionicons name="help-circle-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Contact Support</Text>
            <Text className="text-gray-400 text-sm">Help & feedback</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4"
          onPress={() => router.push("/(screen)/DeveloperInfo")}
        >
          <Ionicons name="code-slash-outline" size={20} color="#9ca3af" />
          <View className="flex-1 ml-4">
            <Text className="text-white">Developer Info</Text>
            <Text className="text-gray-400 text-sm">
              Developer & tech stack
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Static Info */}
        <View className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4">
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#9ca3af"
          />
          <View className="ml-4">
            <Text className="text-white">App Version</Text>
            <Text className="text-gray-400 text-sm">1.0.0</Text>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center mt-8 mb-10">
          <Text className="text-primary-btnLight text-sm">
            Scribbly © {new Date().getFullYear()} — All Rights Reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
