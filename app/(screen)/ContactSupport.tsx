import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ContactPage = () => {
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle form submission
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    // Simulate sending message
    Alert.alert(
      "Message Sent",
      "Thanks for reaching out! We'll get back to you soon."
    );

    // Reset form
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  // Contact methods
  const contactMethods = [
    {
      title: "Authentication Support",
      subtitle: "Get help with your account",
      icon: "mail-outline",
      action: "support@scribbly.app",
      type: "email",
      to: "/(quickContact)/AuthSupport",
    },
    {
      title: "Feature Request",
      subtitle: "Suggest new features",
      icon: "bulb-outline",
      action: "feedback@scribbly.app",
      type: "email",
      to: "/(quickContact)/FeatureRequest",
    },
    {
      title: "Bug Report",
      subtitle: "Report issues or bugs",
      icon: "bug-outline",
      action: "bugs@scribbly.app",
      type: "email",
      to: "/(quickContact)/BugReport",
    },
  ];

  return (
    <View className="flex-1 bg-primary-dark">
      {/* Header */}
      <View className="flex-row items-center p-4 bg-primary-dark">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4"
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            className="text-primary-btnLight"
          />
        </TouchableOpacity>
        <Text className="text-primary-button text-xl font-bold">
          Contact Support
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Introduction */}
        <View className="mb-8">
          <Text className="text-primary-btnLight text-lg font-medium mb-2">
            Get in Touch
          </Text>
          <Text className="text-gray-400 leading-6">
            Need help with Scribbly? Have a feature request or found a bug? We'd
            love to hear from you.
          </Text>
        </View>

        {/* Quick Contact Methods */}
        <View className="mb-8">
          <Text className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wide">
            Quick Contact
          </Text>

          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center p-4 bg-gray-800/50 rounded-2xl mb-3"
              activeOpacity={0.7}
              onPress={() => {
                // Handle contact method press
                Alert.alert("Contact", `Opening ${method.action}`);
                router.push(method.to);
              }}
            >
              {/* Icon */}
              <View className="w-10 h-10 bg-gray-700 rounded-full items-center justify-center">
                <Ionicons name={method.icon} size={20} color="#9ca3af" />
              </View>

              {/* Content */}
              <View className="flex-1 ml-4">
                <Text className="text-gray-200 font-medium">
                  {method.title}
                </Text>
                <Text className="text-gray-400 text-sm mt-1">
                  {method.subtitle}
                </Text>
              </View>

              {/* Arrow */}
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Form */}
        <View className="mb-8">
          <Text className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wide">
            Send Message
          </Text>

          {/* Name Input */}
          <View className="mb-4">
            <label className="text-slate-400 font-medium">Name *</label>
            <TextInput
              className="bg-gray-800 rounded-2xl ring-1 focus:ring-2 outline-0 ring-primary-btnLight p-4 text-gray-200"
              placeholder="i.e john doe"
              autoFocus
              placeholderTextColor="rgb(196 181 253 / 0.5)"
              value={form.name}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, name: text }))
              }
            />
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <label className="text-slate-400 font-medium">Email *</label>
            <TextInput
              className="bg-gray-800/50 rounded-2xl ring-1 focus:ring-2 outline-0 ring-primary-btnLight p-4 text-gray-200"
              placeholder="i.e johndoe@email.com"
              placeholderTextColor="rgb(196 181 253 / 0.5)"
              value={form.email}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Subject Input */}
          <View className="mb-4">
            <label className="text-slate-400 font-medium">Subject</label>
            <TextInput
              className="bg-gray-800 ring-1 focus:ring-2 outline-0 ring-primary-btnLight rounded-2xl p-4 text-gray-200"
              placeholder="What's this about?"
              placeholderTextColor="rgb(196 181 253 / 0.5)"
              value={form.subject}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, subject: text }))
              }
            />
          </View>

          {/* Message Input */}
          <View className="mb-6">
            <label className="text-slate-400 font-medium">Message *</label>
            <TextInput
              className="bg-gray-800/50 rounded-2xl p-4 ring-1 focus:ring-2 outline-0 ring-primary-btnLight text-gray-200 h-32"
              placeholder="Tell us how we can help..."
              placeholderTextColor="rgb(196 181 253 / 0.5)"
              value={form.message}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, message: text }))
              }
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-primary-button rounded-2xl p-4 items-center"
            activeOpacity={0.7}
            onPress={handleSubmit}
          >
            <Text className="text-white font-medium">Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="items-center mb-2">
          <Text className="text-gray-600 text-sm text-center">
            We typically respond within 24 hours
          </Text>
        </View>
        <View  className="items-center mb-8">
          <Text className="text-primary-btnLight text-sm text-center">
            Scribbly © {new Date().getFullYear()} | All Rights Reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactPage;
