import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { MenuProvider } from "./context/MenuContext";
import MenuModal from "./modals/MenuModal";
import Toast from "react-native-toast-message"

const howareyou = "kephkhale";

const USER_DETAILS = "scribbly-user-details";


export default function RootLayout() {
  const CheckAuthenticationAndstatus = async () => {
    try {
      const userDetails = await AsyncStorage.getItem(USER_DETAILS);
      if (userDetails) {
        // router.push("/authentication/Login");
      } else {
        router.push("/authentication/Signup");
      }
    } catch (err) {
      console.log("AsyncStorage: ", err);
    }
  };
  useEffect(() => {
    CheckAuthenticationAndstatus();
  }, []);

  return (
    <MenuProvider>
      <>
        <MenuModal />
        <Toast />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(screen)/Trash"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/Settings"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/ContactSupport"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/PrivacyPolicy"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(quickContact)/AuthSupport"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="authentication/Signup"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="authentication/Login"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(quickContact)/BugReport"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(quickContact)/FeatureRequest"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(screen)/DeveloperInfo"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(optionals)/BuyMeCoffee"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(screen)/ResetPin"
            options={{ headerShown: false }}
          />
        </Stack>
      </>
    </MenuProvider>
  );
}
