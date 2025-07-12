import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Vibration, View } from "react-native";
import { verifyPin } from "../utils/auth";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const [pin, setPin] = useState("");

  useEffect(() => {
    handleLogin();
  }, [pin]);

  const handlePress = async (value: string) => {
    if (value === "del") {
      setPin(pin.slice(0, -1));
      return;
    }
    if (pin.length < 4) {
      setPin(pin + value);
    }
    if (pin.length >= 3) {
   
      // const ok = await verifyPin(pin);
      // console.log(pin)
      // console.log(ok)
      // if (ok) {
      //   console.log("verification complete");
      //   router.push("/");
      // } else if (!ok) {
      //   console.log("Wrong credentials.");
      // }
    }
  };

  const handleLogin = async () => {
    if (pin.length < 4) return;
    const ok = await verifyPin(pin); 
    if (ok) {
      console.log("verification complete");
      setPin("")
      Toast.show({
        type:'success',
        text1:'successfully logged in!',
        text2:'Logged in to scribbly...'
      })
      router.push("/")
    } else {
      Vibration.vibrate(100);
      console.log("wrong credentials");
      setPin("");
    }
  };

  return (
    <View className="flex-1 bg-primary-dark">
      <View className="flex-1 px-6 shadow-xl justify-center">
        {/* Floating Elements */}
        <View className="absolute top-20 left-10 w-32 h-32 bg-white/10 animate-pulse rounded-full" />
        <View className="absolute bottom-40 right-8 w-24 h-24 bg-white/5 animate-pulse rounded-full" />

        <View className="items-center">
          {/* App Title */}
          <Text className="text-primary-button text-4xl font-bold text-center mb-2 tracking-wide">
            Quizzly
          </Text>
          <Text className="text-white/80 text-lg text-center mb-6">
            Enter your PIN to continue
          </Text>

          {/* PIN dots */}
          <View className="flex-row justify-center mb-6 space-x-6 bg-white/10 rounded-2xl px-8 py-6">
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                className={`w-4 h-4 rounded-full ${
                  i < pin.length
                    ? "bg-white shadow-lg"
                    : "border-2 border-white/40"
                }`}
              />
            ))}
          </View>

          {/* Keypad */}
          <View className="bg-white/5 rounded-3xl p-4 mb-8">
            <View className="grid grid-cols-3 flex-row justify-center">
              {[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "",
                "0",
                "del",
              ].map((key, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handlePress(key)}
                  disabled={key === ""}
                  className={`w-16 h-16 m-2 rounded-2xl justify-center items-center ${
                    key === ""
                      ? "opacity-0"
                      : "bg-white/20 border border-white/10 active:bg-white/30"
                  }`}
                >
                  <Text className="text-white text-xl font-semibold  items-center flex ">
                    {key === "del" ? (
                      <Ionicons name="backspace-outline" size={24} />
                    ) : (
                      key
                    )}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Unlock Button */}
          {/* <TouchableOpacity
            // onPress={handleLogin}
            disabled={pin.length < 4}
            className={`w-full py-4 rounded-2xl items-center mb-6 ${
              pin.length === 4
                ? "bg-white shadow-lg"
                : "bg-white/20 border border-white/10"
            }`}
          >
            <Text
              className={`text-lg font-bold ${
                pin.length === 4 ? "text-purple-700" : "text-white/60"
              }`}
            >
              {pin.length === 4 ? "🚀 Unlock" : "Enter PIN"}
            </Text>
          </TouchableOpacity> */}

          {/* Forgot PIN */}
          <TouchableOpacity onPress={()=>router.push("/(screen)/ForgotPin")} className="items-center bg-white/10 rounded-xl px-6 py-3">
            <Text className="text-white/80 text-sm font-medium">
              Forgot PIN? 🔑
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
