import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMenu } from "../context/MenuContext";

const DeveloperInfoPage = () => {
  const { toggleMenu } = useMenu();
  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 justify-between">
        <View className="flex flex-row">
          <TouchableOpacity onPress={router.back} className="mr-4">
            <Ionicons
              name="chevron-back"
              size={24}
              className="text-primary-btnLight"
            />
          </TouchableOpacity>
          <Text className="text-primary-button text-xl font-bold">
            Developer Info
          </Text>
        </View>
        <View>
          {/* Menu button */}
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={27} className="text-primary-button" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="px-4 pb-10 mt-2">
        {/* Developer */}
        <View className="bg-gray-900 rounded-xl p-4 mb-4 shadow-xl shadow-black/60 ">
          <View className="flex-row items-center mb-2">
            <Ionicons
              name="person-circle-outline"
              size={20}
              color="#a1a1aa"
              className="mr-2"
            />
            <Text className="text-white font-semibold text-base">
              App Developer
            </Text>
          </View>
          <Text className="text-gray-400 text-sm">
            Mr Dickens — Software Engineering Student specializing in
            cross-platform app development with a focus on performance,
            scalability, and intuitive design. Driven to craft solutions that
            blend code quality with real-world impact.
          </Text>
        </View>

        {/* Tech Stack */}
        <View className="bg-gray-900 rounded-xl p-4 mb-4 shadow-xl shadow-black/60 ">
          <View className="flex-row items-center mb-2">
            <Ionicons
              name="hammer-outline"
              size={20}
              color="#a1a1aa"
              className="mr-2"
            />
            <Text className="text-white font-semibold text-base">
              Built With
            </Text>
          </View>
          <Text className="text-gray-400 text-sm leading-relaxed">
            • React Native (Expo){"\n"}• TypeScript{"\n"}• NativeWind +
            TailwindCSS{"\n"}• AsyncStorage{"\n"}• Expo Router{"\n"}•Context API
            {"\n"}• Ionicons
          </Text>
        </View>

        {/* Dev Dependencies */}
        {/* <View className="bg-gray-900 rounded-xl p-4 mb-4 shadow-md shadow-black/30">
          <View className="flex-row items-center mb-2">
            <Ionicons
              name="construct-outline"
              size={20}
              color="#a1a1aa"
              className="mr-2"
            />
            <Text className="text-white font-semibold text-base">
              Dev Dependencies
            </Text>
          </View>
          <Text className="text-gray-400 text-sm leading-relaxed">
            • @babel/core{"\n"}• @types/react{"\n"}• @types/uuid{"\n"}• eslint
            {"\n"}• eslint-config-expo{"\n"}• prettier-plugin-tailwindcss{"\n"}•
            tailwindcss{"\n"}• typescript
          </Text>
        </View> */}

        {/* Contact */}
        <View className="bg-gray-900 rounded-xl p-4 mb-4 shadow-xl shadow-black/60 ">
          <TouchableOpacity
            onPress={() => Linking.openURL("mailto:omondidickens255@gmail.com")}
            className="flex-row items-center"
          >
            <Ionicons name="mail-outline" size={20} color="#a1a1aa" />
            <Text className="text-gray-300 ml-2">
              omondidickens255@gmail.com
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL("tel:+254716957179")}
            className="flex-row items-center"
          >
            <Ionicons name="call-outline" size={20} color="#a1a1aa" />
            <Text className="text-gray-300 ml-2">+254 716 957179</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL("https://github.com/dikie001")}
            className="flex-row items-center"
          >
            <Ionicons name="logo-github" size={20} color="#a1a1aa" />
            <Text className="text-gray-300 ml-2">github.com/dikie001</Text>
          </TouchableOpacity>
        </View>
        {/* Buy me coffee */}
                <View className="bg-gray-900 rounded-xl p-4 mb-4 shadow-xl shadow-black/60 ">

        <TouchableOpacity
          onPress={() => router.push("/(optionals)/BuyMeCoffee")}
          className="flex-row items-center space-x-2 p-3 rounded-xl bg-white/5"
        >
          <Ionicons name="cafe" size={24} color="#FBBF24" />{" "}
          <Text className="text-white font-medium">Buy Me Coffee</Text>
        </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="items-center mt-10">
          <Text className="text-primary-btnLight text-xs">
            Scribbly © {new Date().getFullYear()} — All Rights Reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeveloperInfoPage;
