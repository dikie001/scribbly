import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMenu } from "../context/MenuContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SHOW_LOGIN_PAGE = "scribbly-show-login-page";


const MenuModal = () => {
const {isMenuOpen, closeMenu}=useMenu()


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
  const handleMenuPress = (route:any) => {
    closeMenu()
    router.push(route);
  };

  // Logout
  const Logout=async()=>{
    await AsyncStorage.setItem(SHOW_LOGIN_PAGE, "false")
    closeMenu()
    router.push('/authentication/Login')
  }

  return (
    <Modal
      visible={isMenuOpen}
      transparent
      animationType="fade"
      onRequestClose={closeMenu}
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

          <TouchableOpacity
            onPress={Logout}
            className="mt-6 p-3 bg-red-700/20 rounded-xl shadow-xl "
            activeOpacity={0.7}
          >
            <Text className="text-gray-400  text-center font-medium ">
              Logout
            </Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={closeMenu}
            className="mt-6 p-3 bg-violet-700/20 rounded-xl shadow-xl "
            activeOpacity={0.7}
          >
            <Text className="text-gray-400  text-center font-medium ">
              close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MenuModal;
