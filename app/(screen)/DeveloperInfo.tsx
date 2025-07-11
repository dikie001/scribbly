import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DeveloperInfoPage = () => {
  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={router.back} className="mr-4">
          <Ionicons name="chevron-back" size={24} className="text-primary-btnLight"/>
        </TouchableOpacity>
        <Text className="text-primary-button text-xl font-bold">Developer Info</Text>
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
            TailwindCSS{"\n"}• AsyncStorage{"\n"}• Expo Router{"\n"}• Ionicons
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
