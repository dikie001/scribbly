import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabIcon = ({ name, icon, focused }: any) => {
  return (
    <View className="overflow-hidden outline-none items-center rounded-full  ">
      <View
        className={`${focused ? "bg-gray-700 " : "bg-transparent"} h-14 outline-none  overflow-hidden flex justify-center items-center   px-4 flex-row min-w-[112px] w-full`}
      >
        <Ionicons name={icon} size={focused ? 26 : 25} className={`${focused ? "text-primary-button": 'text-gray-400'}`} />
        {focused && (
          <Text className="text-white font-bold ml-2 text-sm">{name}</Text>
        )}
      </View>
    </View>
  );
};
const tabs = [
  { name: "index", title: "Notes", icon: "document" },
  { name: "NewNote", title: "New", icon: "add" },
  { name: "Favourites", title: "Fav...", icon: "star" },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          height: 60,
          paddingVertical: 8,
          backgroundColor: "transparent",
        },
        tabBarStyle: {
          backgroundColor: "#1f2937",
          height: 55,
          width: 336,
          borderRadius: 25,
          marginBottom: 20,
          marginHorizontal: "auto",
          position: "absolute",
          borderTopWidth: 0,
          shadowColor: "#0000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
          elevation: 20,
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
