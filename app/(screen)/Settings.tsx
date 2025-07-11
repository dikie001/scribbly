import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import MenuModal from "../(components)/Menu";

const SettingsPage = () => {
  const [openMenu, setOpenMenu] = useState(false);

  // Initial settings state
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSync: true,
    notifications: false,
    autoSave: true,
    fontSize: "medium",
  });

  // Toggle setting on/off
  const toggleSetting = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Settings sections and items
  const settingSections = [
    {
      title: "Appearance",
      items: [
        {
          title: "Dark Mode",
          subtitle: "Use dark theme",
          icon: "moon-outline",
          type: "toggle",
          key: "darkMode",
          value: settings.darkMode,
        },
        {
          title: "Font Size",
          subtitle: "Adjust text size",
          icon: "text-outline",
          type: "selection",
          key: "fontSize",
          value: settings.fontSize,
        },
      ],
    },
    {
      title: "Sync & Storage",
      items: [
        {
          title: "Auto Sync",
          subtitle: "Sync notes across devices",
          icon: "cloud-outline",
          type: "toggle",
          key: "autoSync",
          value: settings.autoSync,
        },
        {
          title: "Auto Save",
          subtitle: "Save changes automatically",
          icon: "save-outline",
          type: "toggle",
          key: "autoSave",
          value: settings.autoSave,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          title: "Push Notifications",
          subtitle: "Receive app notifications",
          icon: "notifications-outline",
          type: "toggle",
          key: "notifications",
          value: settings.notifications,
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          title: "App Version",
          subtitle: "1.0.0",
          icon: "information-circle-outline",
          type: "info",
        },
        {
          title: "Privacy Policy",
          subtitle: "View our privacy policy",
          icon: "shield-outline",
          type: "navigation",
          to: "/(screen)/PrivacyPolicy",
        },
        {
          title: "Contact Support",
          subtitle: "Get help with Scribbly",
          icon: "help-circle-outline",
          type: "navigation",
          to: "/(screen)/ContactSupport",
        },
        {
          title: "Developer Info",
          subtitle: "View app creator & tech stack",
          icon: "code-slash-outline",
          type: "navigation",
          to: "/(screen)/DeveloperInfo",
        },
      ],
    },
  ];

  // Render a single setting item
  const renderSettingItem = (item: any) => (
    <TouchableOpacity
      key={item.title}
      activeOpacity={0.7}
      onPress={() => {
        item.type === "toggle" && toggleSetting(item.key);
        item.type ==="navigation" && item.to && router.push(item.to)
      }}
      className="flex-row items-center p-4 bg-gray-800/50 rounded-2xl mb-3"
    >
      {/* Icon */}
      <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center">
        <Ionicons name={item.icon} size={20} color="#9ca3af" />
      </View>

      {/* Texts */}
      <View className="flex-1 ml-4">
        <Text className="text-gray-200 font-medium">{item.title}</Text>
        <Text className="text-gray-400 text-sm mt-1">{item.subtitle}</Text>
      </View>

      {/* Right-side Control */}
      <View className="ml-4">
        {item.type === "toggle" && (
          <Switch
            value={item.value}
            onValueChange={() => toggleSetting(item.key)}
            trackColor={{ false: "#374151", true: "#6b7280" }}
            thumbColor={item.value ? "#e5e7eb" : "#9ca3af"}
          />
        )}
        {item.type === "navigation" && (
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        )}
        {item.type === "selection" && (
          <Text className="text-gray-400 capitalize">{item.value}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row justify-between p-4 items-center">
        <View className="flex-row items-center  pt-1">
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

        {/* Menu Toggle */}
        <TouchableOpacity onPress={() => setOpenMenu(!openMenu)}>
          <Ionicons name="menu" size={27} className="text-primary-button" />
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      {openMenu && <MenuModal />}

      {/* Settings List */}
      <ScrollView className="flex-1 p-4">
        {settingSections.map((section, i) => (
          <View key={i} className="mb-8">
            <Text className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wide">
              {section.title}
            </Text>
            {section.items.map(renderSettingItem)}
          </View>
        ))}

        {/* Footer */}
        <View className="items-center mt-4 mb-8">
          <Text className="text-primary-btnLight">
            {" "}
            Scribbly © {new Date().getFullYear()} — All Rights Reserved
          </Text>{" "}
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;
