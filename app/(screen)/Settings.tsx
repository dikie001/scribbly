import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useMenu } from "../context/MenuContext";

const SettingsPage = () => {
  const { toggleMenu } = useMenu();

  // Simple settings states
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [usePin, setUsePin] = useState(true);
  const [checked, setChecked] = useState<boolean>();

  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row justify-between p-4 items-center">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={router.back}
            className="mr-4"
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              className="text-primary-btnLight"
            />
          </TouchableOpacity>
          <Text className="text-primary-button text-xl font-bold">
            Settings
          </Text>
        </View>

        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={27} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Settings List */}
      <ScrollView className="p-4">
    
        {/* Toggles */}
        <SettingItem
          title="Dark Mode"
          subtitle="Use dark theme"
          icon="moon-outline"
          value={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
        <SettingItem
          title="Notes View Style"
          subtitle={`Currently: ${checked ? "Grid View" : "List View"}`}
          icon={checked ? "grid" : "list"}
          value={checked}
          onToggle={() => setChecked(!checked)}
        />

        <SettingItem
          title="Auto Save"
          subtitle="Save notes automatically"
          icon="save-outline"
          value={autoSave}
          onToggle={() => setAutoSave(!autoSave)}
        />

        <SettingItem
          title="Notifications"
          subtitle="Enable notifications"
          icon="notifications-outline"
          value={notifications}
          onToggle={() => setNotifications(!notifications)}
        />

        <SettingItem
          title="Use 4-digit PIN"
          subtitle="Secure app access"
          icon="lock-closed-outline"
          value={usePin}
          onToggle={() => setUsePin(!usePin)}
        />

        {/* Navigation buttons */}
        <NavItem
          title="Privacy Policy"
          subtitle="How we handle data"
          icon="shield-outline"
          to="/(screen)/PrivacyPolicy"
        />
        <NavItem
          title="Reset Pin"
          subtitle="Change your app login PIN"
          icon="lock-closed-outline"
          to="/(screen)/ResetPin"
        />

        <NavItem
          title="Contact Support"
          subtitle="Help & feedback"
          icon="help-circle-outline"
          to="/(screen)/ContactSupport"
        />

        <NavItem
          title="Developer Info"
          subtitle="Developer & tech stack"
          icon="code-slash-outline"
          to="/(screen)/DeveloperInfo"
        />

        {/* App version - no navigation */}
        <InfoItem
          title="App Version"
          subtitle="1.0.0"
          icon="information-circle-outline"
        />

        {/* Footer */}
        <View className="items-center mt-8 mb-10">
          <Text className="text-gray-500 text-sm">
            Scribbly © {new Date().getFullYear()} — All Rights Reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// 🔘 Basic toggle switch
const SettingItem = ({ title, subtitle, icon, value, onToggle }: any) => (
  <View className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4">
    <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center">
      <Ionicons name={icon} size={20} color="#9ca3af" />
    </View>
    <View className="flex-1 ml-4">
      <Text className="text-white font-medium">{title}</Text>
      <Text className="text-gray-400 text-sm">{subtitle}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: "#374151", true: "#4ade80" }}
      thumbColor={value ? "#6d28d9" : "#9ca3af"}
    />
  </View>
);

// 👉 Nav item (chevron)
const NavItem = ({ title, subtitle, icon, to }: any) => (
  <TouchableOpacity
    onPress={() => router.push(to)}
    className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4"
    activeOpacity={0.7}
  >
    <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center">
      <Ionicons name={icon} size={20} color="#9ca3af" />
    </View>
    <View className="flex-1 ml-4">
      <Text className="text-white font-medium">{title}</Text>
      <Text className="text-gray-400 text-sm">{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#6b7280" />
  </TouchableOpacity>
);

// ℹ️ Static info (no nav)
const InfoItem = ({ title, subtitle, icon }: any) => (
  <View className="flex-row items-center p-4 bg-gray-800 rounded-xl mb-4">
    <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center">
      <Ionicons name={icon} size={20} color="#9ca3af" />
    </View>
    <View className="flex-1 ml-4">
      <Text className="text-white font-medium">{title}</Text>
      <Text className="text-gray-400 text-sm">{subtitle}</Text>
    </View>
  </View>
);

export default SettingsPage;
