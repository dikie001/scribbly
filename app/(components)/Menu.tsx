import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const MenuModal = () => {
  const [open, setOpen] = useState(true); 

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
    >
      <View className="flex-1 bg-black/60 justify-center items-center px-4">
        <View className="bg-primary-dark w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-gray-800">
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              router.push("/");
            }}
            className="bg-violet-600/60 rounded-xl p-4"
          >
            <Text className="text-white text-center font-semibold">Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              router.push("/(screen)/Trash");
            }}
            className="bg-[#2c2c2e] rounded-xl p-4"
          >
            <Text className="text-white text-center font-semibold">Trash</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              router.push("/(screen)/Settings");
            }}
            className="bg-[#2c2c2e] rounded-xl p-4"
          >
            <Text className="text-white text-center font-semibold">
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOpen(false);
              router.push("/_sitemap");
            }}
            className="bg-[#2c2c2e] rounded-xl p-4"
          >
            <Text className="text-white text-center font-semibold">
              Site map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpen(false)}>
            <Text className="text-gray-400 text-center mt-2">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MenuModal;
