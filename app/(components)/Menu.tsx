import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuModal = () => {
  const [open, setOpen] = useState(true);

  // Menu items configuration
  const menuItems = [
    {
      title: "Notes",
      icon: "document-text-outline",
      route: "/",
      isActive: true, // Highlight current section
    },
    {
      title: "Trash",
      icon: "trash-outline",
      route: "/(screen)/Trash",
    },
    {
      title: "Settings",
      icon: "settings-outline",
      route: "/(screen)/Settings",
    },
    {
      title: "Site Map",
      icon: "map-outline",
      route: "/_sitemap",
    },
  ];

  // Handle menu item press
  const handleMenuPress = (route) => {
    setOpen(false);
    router.push(route);
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      {/* Backdrop */}
      <View className="flex-1 bg-black/70 justify-center items-center px-6">
        {/* Menu Container */}
        <View className="bg-gray-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-800">
          {/* App Title */}
          <View className="items-center mb-6">
            <Text className="text-white text-xl font-bold tracking-wide">
              Scribbly
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              Your notes, organized
            </Text>
          </View>

          {/* Menu Items */}
          <View className="space-y-3">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleMenuPress(item.route)}
                className={`flex-row items-center p-4 rounded-2xl ${
                  item.isActive
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-gray-800/50"
                }`}
                activeOpacity={0.7}
              >
                {/* Icon */}
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.isActive ? "#e5e7eb" : "#9ca3af"}
                />

                {/* Title */}
                <Text
                  className={`ml-4 font-medium ${
                    item.isActive ? "text-gray-200" : "text-gray-300"
                  }`}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={() => setOpen(false)}
            className="mt-6 p-3"
            activeOpacity={0.7}
          >
            <Text className="text-gray-500 text-center font-medium">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MenuModal;
