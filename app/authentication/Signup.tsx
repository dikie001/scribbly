import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createUser } from "../utils/miniFunctions";

interface FormData {
  name: string;
  pin: string;
  confirmPin: string;
}

interface FormErrors {
  name?: string;
  pin?: string;
  confirmPin?: string;
}

const SignupScreen = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    pin: "",
    confirmPin: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.pin) newErrors.pin = "PIN is required";
    else if (form.pin.length !== 4) newErrors.pin = "PIN must be 4 digits";

    if (form.pin !== form.confirmPin) newErrors.confirmPin = "PINs don't match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      const success = await createUser(form);

      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <View className="flex-1 bg-primary-dark">
      <ScrollView className="flex-1">
        <View className="px-8 pt-16 pb-8">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-primary-button text-4xl text-center font-bold mb-2">
              Secure your notes
            </Text>
            <Text className="text-slate-200 text-lg text-center">
              Create a 4-digit pin to keep your account safe
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Name Input */}
            <View>
              <label className="text-slate-400 font-medium">Username</label>
              <TextInput
                value={form.name}
                onChangeText={(value) => handleInputChange("name", value)}
                placeholder="Enter username i.e dikie"
                autoComplete="off"
                autoFocus
                placeholderTextColor="rgb(196 181 253 / 0.5)"
                className={`bg-gray-800  ring-1 outline-0 ${
                  errors.name ? "ring-red-400" : "ring-primary-btnLight"
                } rounded-xl px-4 py-3 text-primary-light text-base focus:ring-2`}
              />
              {errors.name && (
                <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
              )}
            </View>

            {/* PIN Input */}
            <View>
              <label className="text-slate-400 font-medium ">Create PIN</label>
              <TextInput
                value={form.pin}
                onChangeText={(value) =>
                  handleInputChange("pin", value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="Enter 4-digit PIN"
                placeholderTextColor="rgb(196 181 253 / 0.5)"
                keyboardType="numeric"
                secureTextEntry
                autoComplete="off"
                maxLength={4}
                className={`bg-gray-800 ring-1 outline-0 text-primary-light ${
                  errors.pin ? "ring-red-400" : "ring-primary-btnLight"
                } rounded-xl px-4 py-3 focus:ring-2  text-base text-center tracking-widest`}
              />
              {errors.pin && (
                <Text className="text-red-500 text-xs mt-1">{errors.pin}</Text>
              )}
            </View>

            {/* Confirm PIN Input */}
            <View>
              <label className="text-slate-400 font-medium ">Confirm PIN</label>
              <TextInput
                value={form.confirmPin}
                onChangeText={(value) =>
                  handleInputChange(
                    "confirmPin",
                    value.replace(/\D/g, "").slice(0, 4)
                  )
                }
                placeholder="Confirm your PIN"
                placeholderTextColor="rgb(196 181 253 / 0.5)"
                keyboardType="numeric"
                secureTextEntry
                autoComplete="off"
                maxLength={4}
                className={`bg-gray-800 ring-1 outline-0 ${
                  errors.confirmPin ? "ring-red-400" : "ring-primary-btnLight"
                } rounded-xl px-4 py-3 text-primary-light focus:ring-2 text-base text-center tracking-widest`}
              />
              {errors.confirmPin && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.confirmPin}
                </Text>
              )}
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignup}
            className="bg-primary-button rounded-xl py-3 items-center mt-8 shadow-sm"
          >
            <Text className="text-white text-lg font-semibold">
              Create Account
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-primary-btnLight">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/authentication/Login")}
            >
              <Text className="text-primary-button font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
