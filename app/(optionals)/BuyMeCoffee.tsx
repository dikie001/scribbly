import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";

const BuyMeCoffeePage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const coffeeAmounts = [
    { label: "☕ Small Coffee", amount: 50 },
    { label: "☕ Medium Coffee", amount: 100 },
    { label: "☕ Large Coffee", amount: 200 },
    { label: "☕☕ Double Shot", amount: 300 },
  ];

  const handlePayment = () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 10) {
      Alert.alert("Error", "Please select or enter a valid amount");
      return;
    }
    if (!paymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }

    if (paymentMethod === "mpesa" && !mpesaNumber) {
      Alert.alert("Error", "Please enter your M-Pesa number");
      return;
    }

    if (paymentMethod === "card") {
      if (
        !cardDetails.number ||
        !cardDetails.expiry ||
        !cardDetails.cvv ||
        !cardDetails.name
      ) {
        Alert.alert("Error", "Please fill in all card details");
        return;
      }
    }

    Alert.alert(
      "Payment Initiated",
      `KES ${amount} payment via ${paymentMethod === "mpesa" ? "M-Pesa" : "Card"}`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <View className="flex-1 bg-primary-dark">
      <ScrollView className="flex-1">
        <View className="px-6 pt-16 pb-8">
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-6xl mb-4">☕</Text>
            <Text className="text-primary-button text-3xl font-bold text-center mb-2">
              Buy Me Coffee
            </Text>
            <Text className="text-slate-100 text-center">
              Support the development of Quizzly
            </Text>
          </View>

          {/* Amount Selection */}
          <View className="mb-8">
            <Text className="text-slate-400 font-semibold text-lg mb-4">
              Choose Amount
            </Text>
            <View className="flex-row flex-wrap gap-3 mb-4">
              {coffeeAmounts.map((coffee) => (
                <TouchableOpacity
                  key={coffee.amount}
                  onPress={() => {
                    setSelectedAmount(coffee.amount);
                    setCustomAmount("");
                  }}
                  className={`flex-1 min-w-[45%] py-4 px-3 rounded-xl shadow-xl  elevation-md  ${
                    selectedAmount === coffee.amount
                      ? "bg-slate-950 ring-1"
                      : "bg-slate-950 "
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      selectedAmount === coffee.amount
                        ? "text-white"
                        : "text-primary-light/90"
                    }`}
                  >
                    {coffee.label}
                  </Text>
                  <Text
                    className={`text-center text-lg font-bold ${
                      selectedAmount === coffee.amount
                        ? "text-white"
                        : "text-slate-400"
                    }`}
                  >
                    KES {coffee.amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom Amount */}
            <View>
              <label className="text-slate-400 font-medium mb-2">
                Or enter custom amount
              </label>
              <TextInput
                value={customAmount}
                onChangeText={(value) => {
                  setCustomAmount(value.replace(/\D/g, ""));
                  setSelectedAmount(null);
                }}
                placeholder="Enter amount in KES"
                placeholderTextColor="rgb(196 181 253 / 0.5)"
                keyboardType="numeric"
                className="bg-gray-800 ring-1 focus:ring-2 outline-0 rounded-xl px-4 py-4 text-primary-light text-base"
              />
            </View>
          </View>

          {/* Payment Methods */}
          <View className="mb-8">
            <Text className="text-slate-400 font-semibold text-lg mb-4">
              Payment Method
            </Text>

            {/* M-Pesa Option */}
            <TouchableOpacity
              onPress={() => setPaymentMethod("mpesa")}
              className={`mb-4 p-4 rounded-xl border-2 ${
                paymentMethod === "mpesa"
                  ? "bg-gray-950 ring ring-green-500"
                  : "bg-gray-950 ring-1 ring-green-500"
              }`}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-600 rounded-lg items-center justify-center mr-3">
                  <Text className="text-white font-bold text-lg">M</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 font-semibold">M-Pesa</Text>
                  <Text className="text-slate-500 text-sm">
                    Pay with your mobile money
                  </Text>
                </View>
                <View
                  className={`w-5 h-5 rounded-full border-2 ${
                    paymentMethod === "mpesa"
                      ? "bg-green-500 border-green-500"
                      : "border-slate-300"
                  }`}
                />
              </View>
            </TouchableOpacity>

            {/* M-Pesa Number Input */}
            {paymentMethod === "mpesa" && (
              <View className="mb-4">
                <TextInput
                  value={mpesaNumber}
                  onChangeText={setMpesaNumber}
                  placeholder="Enter M-Pesa number (254...)"
                  placeholderTextColor="rgb(196 181 253 / 0.5)"
                  keyboardType="phone-pad"
                  className="bg-gray-800 ring-1 outline-0 focus:ring-2 rounded-xl px-4 py-4 text-white"
                />
              </View>
            )}

            {/* Card Option */}
            <TouchableOpacity
              onPress={() => setPaymentMethod("card")}
              className={`mb-4 p-4 rounded-xl border-2 ${
                paymentMethod === "card"
                  ? "bg-gray-950 ring ring-blue-500"
                  : "bg-gray-950 ring-1 ring-blue-500"
              }`}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-blue-600 rounded-lg items-center justify-center mr-3">
                  <Text className="text-white font-bold text-lg">💳</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-slate-400 font-semibold">
                    Credit/Debit Card
                  </Text>
                  <Text className="text-slate-500 text-sm">
                    Visa, Mastercard accepted
                  </Text>
                </View>
                <View
                  className={`w-5 h-5 rounded-full border-2 ${
                    paymentMethod === "card"
                      ? "bg-blue-500 border-blue-500"
                      : "border-slate-300"
                  }`}
                />
              </View>
            </TouchableOpacity>

            {/* Card Details */}
            {paymentMethod === "card" && (
              <View className="space-y-3">
                <TextInput
                  value={cardDetails.number}
                  onChangeText={(value) =>
                    setCardDetails((prev) => ({ ...prev, number: value }))
                  }
                  placeholder="Card Number"
                  placeholderTextColor="rgb(196 181 253 / 0.5)"
                  keyboardType="numeric"
                  className="bg-gray-800 outline-0 ring-1 focus:ring-2 rounded-xl px-4 py-4 text-primary-light"
                />
                <View className="flex-row space-x-3 ">
                  <TextInput
                    value={cardDetails.expiry}
                    onChangeText={(value) =>
                      setCardDetails((prev) => ({ ...prev, expiry: value }))
                    }
                    placeholder="MM/YY"
                    placeholderTextColor="rgb(196 181 253 / 0.5)"
                    keyboardType="numeric"
                    className="flex-1 bg-gray-800 w-10 ring-1 outline-0 focus:ring-2 rounded-xl px-4 py-4 text-primary-light"
                  />
                  <TextInput
                    value={cardDetails.cvv}
                    onChangeText={(value) =>
                      setCardDetails((prev) => ({ ...prev, cvv: value }))
                    }
                    placeholder="CVV"
                    placeholderTextColor="rgb(196 181 253 / 0.5)"
                    keyboardType="numeric"
                    secureTextEntry
                    className="flex-1 bg-gray-800 ring-1 w-10 outline-0 focus:ring-2 rounded-xl px-4 py-4 text-primary-light"
                  />
                </View>
                <TextInput
                  value={cardDetails.name}
                  onChangeText={(value) =>
                    setCardDetails((prev) => ({ ...prev, name: value }))
                  }
                  placeholder="Cardholder Name"
                  placeholderTextColor="rgb(196 181 253 / 0.5)"
                  className="bg-gray-800 ring-1 focus:ring-2 outline-0 rounded-xl px-4 py-4 text-primary-light"
                />
              </View>
            )}
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            onPress={handlePayment}
            className="bg-primary-button rounded-xl py-4 items-center mb-6 shadow-sm"
          >
            <Text className="text-white text-lg font-semibold">
              Pay KES {selectedAmount || customAmount || "0"} ☕
            </Text>
          </TouchableOpacity>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center"
          >
            <Text className="text-slate-600 font-medium">← Back to App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyMeCoffeePage;
