import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuModal from "../(components)/Menu";


const SettingsPage = () => {
  const [openMenu, setOpenMenu]=useState<boolean>(false)
  // Settings state
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSync: true,
    notifications: false,
    autoSave: true,
    fontSize: "medium",
  });

  // Toggle setting
  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Setting sections configuration
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
        },
        {
          title: "Contact Support",
          subtitle: "Get help with Scribbly",
          icon: "help-circle-outline",
          type: "navigation",
        },
      ],
    },
  ];

  // Render setting item based on type
  const renderSettingItem = (item) => {
    return (
      <TouchableOpacity
        key={item.title}
        className="flex-row items-center p-4 bg-gray-800/50 rounded-2xl mb-3"
        activeOpacity={0.7}
        onPress={() => {
          if (item.type === "toggle") {
            toggleSetting(item.key);
          }
        }}
      >
        {/* Icon */}
        <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center">
          <Ionicons name={item.icon} size={20} color="#9ca3af" />
        </View>

        {/* Content */}
        <View className="flex-1 ml-4">
          <Text className="text-gray-200 font-medium">{item.title}</Text>
          <Text className="text-gray-400 text-sm mt-1">{item.subtitle}</Text>
        </View>

        {/* Control */}
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
  };

  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="justify-between flex flex-row px-4 items-center">
        <View className="flex-row items-center p-4 pt-1 bg-primary-dark">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4"
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#e5e7eb" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Settings</Text>
        </View>
        {/* menu icon and button */}
        <TouchableOpacity onPress={()=>setOpenMenu(!openMenu)}>
          {" "}
          <Ionicons name="menu" size={27} className="text-primary-button" />
        </TouchableOpacity>
      </View>

     {/* Menu modal */}
     {openMenu && <MenuModal/>}
      {/* Settings Content */}
      <ScrollView className="flex-1 p-4">
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-8">
            {/* Section Title */}
            <Text className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wide">
              {section.title}
            </Text>

            {/* Section Items */}
            <View>{section.items.map(renderSettingItem)}</View>
          </View>
        ))}

        {/* Footer */}
        <View className="items-center mt-8 mb-8">
          <Text className="text-gray-600 text-sm">
            Made with ❤️ for note-taking
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;
