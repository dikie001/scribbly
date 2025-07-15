import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface TabIconProps {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, icon, focused }) => {
  return (
    <View className="items-center justify-center">
      <View
        className={`
          ${
            focused
              ? "bg-gradient-to-r from-blue-600 to-purple-600 h-14 shadow-lg shadow-blue-500/25"
              : "bg-gray-800/50 hover:bg-gray-700/50"
          } 
          h-14 px-4 flex-row items-center justify-center rounded-2xl
          transition-all duration-200 ease-in-out
          ${focused ? "min-w-[120px]" : "min-w-[48px]"}
        `}
      >
        <Ionicons
          name={icon}
          size={focused ? 22 : 20}
          color={focused ? "#ffffff" : "#9ca3af"}
        />
        {focused && (
          <Text className="text-white font-semibold ml-2 text-sm tracking-wide">
            {name}
          </Text>
        )}
      </View>
    </View>
  );
};

interface TabConfig {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const tabs: TabConfig[] = [
  { name: "index", title: "Notes", icon: "document-text" },
  { name: "NewNote", title: "Create", icon: "add-circle" },
  { name: "Favourites", title: "Favorites", icon: "heart" },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          height: 68,
          paddingVertical: 10,
          backgroundColor: "transparent",
          borderRadius: 20,
          
        },
        tabBarStyle: {
          backgroundColor: "#111827",
          height: 60,
          width: 350,
          borderRadius: 14,
          marginBottom: 24,
          marginHorizontal: "auto",
          position: "absolute",
          borderTopWidth: 0,
          shadowColor: "#6d28d9",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 44,
          borderWidth: 0,
          borderColor: "#6d28d9",
        },
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <TabIcon name={title} icon={icon} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
